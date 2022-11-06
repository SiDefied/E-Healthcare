using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Hosting;
using System.Data.SqlClient;
using System.Data;
using EhealthcareWebsite.Models;
using System.IO;

namespace EhealthcareWebsite.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : Controller
    {
        private readonly IConfiguration _configuration1;

        public UserController(IConfiguration configuration)
        {
            _configuration1 = configuration;
        }

        [HttpGet]
        public JsonResult Get()
        {
            string query = @"
                            select * from dbo.[User]
                           ";

            DataTable dt = new DataTable();
            string datasource = _configuration1.GetConnectionString("EhealthcareCon");
            SqlDataReader reader;
            using (SqlConnection con = new SqlConnection(datasource))
            {
                con.Open();
                using (SqlCommand cmd = new SqlCommand(query, con))
                {
                    reader = cmd.ExecuteReader();
                    dt.Load(reader);
                    con.Close();
                }
            }
            return new JsonResult(dt);
        }

        [HttpPost]
        public JsonResult Post(User user)
        {
            string query = @"
                            insert into dbo.[User]
                                   (user_name,user_password,user_role)
                            values (@user_name,@user_password,@user_role)
                           ";

            DataTable dt1 = new DataTable();
            string datasource1 = _configuration1.GetConnectionString("EhealthcareCon");
            SqlDataReader reader;
            using (SqlConnection con1 = new SqlConnection(datasource1))
            {
                con1.Open();
                using (SqlCommand cmd1 = new SqlCommand(query, con1))
                {
                    cmd1.Parameters.AddWithValue("@user_name", user.user_name);
                    cmd1.Parameters.AddWithValue("@user_password", user.user_password);
                    cmd1.Parameters.AddWithValue("@user_role", user.user_role);
                    reader = cmd1.ExecuteReader();
                    dt1.Load(reader);
                    reader.Close();
                    con1.Close();
                }
            }
            return new JsonResult("Added");
        }


        [HttpDelete]
        public JsonResult Delete(int id)
        {
            string query = @"
                            delete from dbo.[User]
                            where user_id=@user_id
                           ";

            DataTable dt = new DataTable();
            string datasource = _configuration1.GetConnectionString("EhealthcareCon");
            SqlDataReader reader;
            using (SqlConnection con = new SqlConnection(datasource))
            {
                con.Open();
                using (SqlCommand cmd = new SqlCommand(query, con))
                {
                    cmd.Parameters.AddWithValue("@user_id", id);
                    reader = cmd.ExecuteReader();
                    dt.Load(reader);
                    con.Close();
                }
            }
            return new JsonResult("Deleted");
        }


    }
}
