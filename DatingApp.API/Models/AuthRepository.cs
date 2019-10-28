using System;
using System.Threading.Tasks;
using DatingApp.API.Data;
using Microsoft.EntityFrameworkCore;

namespace DatingApp.API.Models
{
    public class AuthRepository : IAuthRepository
    {
        public DataContext _Context { get; set; }
        public AuthRepository(DataContext context)
        {
            _Context = context;
        }

 
        public async Task<User> Login(string username, string password)
        {
           var user = await _Context.Users.Include(p => p.Photos).FirstOrDefaultAsync(x => x.Username == username);
           
           if(user == null)
           return null;

           if(! verifyPasswordHash(password, user.PasswordHash , user.PasswordSalt))
           return null; 

           return user;
        }

        private bool verifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
        {
             using( var hmac = new System.Security.Cryptography.HMACSHA512(passwordSalt)){
                
                var computedhash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));

                for(int i=0 ; i < computedhash.Length ; i++)
                {
                    if(computedhash[i]!=passwordHash[i])
                      return false;
                }

                return true;
            
            }

        }

        public async Task<User> Register(User user, string password)
        {
            byte[]  PasswordHash , PasswordSalt ;
            CreatePasswordHash(password ,out PasswordHash ,out PasswordSalt);

            user.PasswordHash = PasswordHash;
            user.PasswordSalt = PasswordSalt;

            await _Context.AddAsync(user);
            await _Context.SaveChangesAsync();  
            return user;
           
        }

        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using( var hmac = new System.Security.Cryptography.HMACSHA512()){
                passwordSalt = hmac.Key ;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }

        public async Task<bool> UserExist(string username)
        {
            if(await _Context.Users.AnyAsync(x => x.Username == username))
            return true;

            return false;
        }
    }
}