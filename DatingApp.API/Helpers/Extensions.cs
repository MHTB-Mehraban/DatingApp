using System;
using Microsoft.AspNetCore.Http;

namespace DatingApp.API.Helpers
{
    public static class Extensions
    {
        public static void addApplicationError(this HttpResponse response,string message) 
        {
            response.Headers.Add("Application-Error",message);
            response.Headers.Add("Access-Control-Expose_Headers","Application-Error");
            response.Headers.Add("Access-Control-Arrow-Origin","*");
        }

        public static int CalculateAge(this DateTime TheDateTime)
        {
            var Age = DateTime.Today.Year - TheDateTime.Year;
            if( TheDateTime.AddYears(Age) > DateTime.Today )
                Age--;

            return Age;
        }
        
    }
}