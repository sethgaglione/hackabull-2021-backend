using System;
using System.ComponentModel.DataAnnotations;

namespace Hackabull2021.Models
{
    public class User
    {
        // Details about the User
        public long Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string UserName { get; set; }
        public string PhoneNumber { get; set; }
        public DateTime Birthday { get; set; }

        // Password Stuff
        public string Password { get; set; }
        public string Salt { get; set; }
        public string HashinTechnique { get; set; }

        // Used to differentiate Users
        public int UserType { get; set; }

        // User Photo
        public string PhotoFileName { get; set; }
    }
}