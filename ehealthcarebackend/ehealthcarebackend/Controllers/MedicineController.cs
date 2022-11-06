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
    public class MedicineController : Controller
    {
        private readonly IConfiguration _configuration;
        private readonly IWebHostEnvironment _env;

        public MedicineController(IConfiguration configuration, IWebHostEnvironment env)
        {
            _configuration = configuration;
            _env = env;
        }
        [HttpGet]
        public JsonResult Get()
        {
            string query = @"
                            select * from dbo.Medicines
                            
                           ";

            DataTable dt = new DataTable();
            string datasource = _configuration.GetConnectionString("EhealthcareCon");
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
        public JsonResult Post(Medicine med)
        {
            string query = @"
                            insert into dbo.Medicines
                                   (med_id,med_name,med_price,med_image,med_seller,med_description)
                            values (@med_id,@med_name,@med_price,@med_image,@med_seller,@med_description)
                           ";

            DataTable dt = new DataTable();
            string datasource = _configuration.GetConnectionString("EhealthcareCon");
            SqlDataReader reader;
            using (SqlConnection con = new SqlConnection(datasource))
            {
                con.Open();
                using (SqlCommand cmd = new SqlCommand(query, con))
                {
                    cmd.Parameters.AddWithValue("@med_id", med.med_id);
                    cmd.Parameters.AddWithValue("@med_name", med.med_name);
                    cmd.Parameters.AddWithValue("@med_price", med.med_price);
                    cmd.Parameters.AddWithValue("@med_image", med.med_image);
                    cmd.Parameters.AddWithValue("@med_seller", med.med_seller);
                    cmd.Parameters.AddWithValue("@med_description", med.med_description);
                    reader = cmd.ExecuteReader();
                    dt.Load(reader);
                    con.Close();
                }
            }
            return new JsonResult("Added");
        }

        [HttpPut]
        public JsonResult Put(Medicine med)
        {
            string query = @"
                            update dbo.Medicines
                            set med_name=@med_name,
                                med_price=@med_price,
                                med_image=@med_image,
                                med_seller=@med_seller,
                                med_description=@med_description                                    
                            where med_id=@med_id
                           ";

            DataTable dt = new DataTable();
            string datasource = _configuration.GetConnectionString("EhealthcareCon");
            SqlDataReader reader;
            using (SqlConnection con = new SqlConnection(datasource))
            {
                con.Open();
                using (SqlCommand cmd = new SqlCommand(query, con))
                {
                    cmd.Parameters.AddWithValue("@med_id", med.med_id);
                    cmd.Parameters.AddWithValue("@med_name", med.med_name);
                    cmd.Parameters.AddWithValue("@med_price", med.med_price);
                    cmd.Parameters.AddWithValue("@med_image", med.med_image);
                    cmd.Parameters.AddWithValue("@med_seller", med.med_seller);
                    cmd.Parameters.AddWithValue("@med_description", med.med_description);
                    reader = cmd.ExecuteReader();
                    dt.Load(reader);
                    con.Close();
                }
            }
            return new JsonResult("Updated");
        }

        [HttpDelete]
        public JsonResult Delete(int id)
        {
            string query = @"
                            delete from dbo.Medicines
                            where med_id=@med_id
                           ";

            DataTable dt = new DataTable();
            string datasource = _configuration.GetConnectionString("EhealthcareCon");
            SqlDataReader reader;
            using (SqlConnection con = new SqlConnection(datasource))
            {
                con.Open();
                using (SqlCommand cmd = new SqlCommand(query, con))
                {
                    cmd.Parameters.AddWithValue("@med_id", id);
                    reader = cmd.ExecuteReader();
                    dt.Load(reader);
                    con.Close();
                }
            }
            return new JsonResult("Deleted");
        }


        [Route("SaveFile")]
        [HttpPost]
        public JsonResult SaveFile()
        {
            try
            {
                var httpRequest = Request.Form;
                var postedFile = httpRequest.Files[0];
                string Filename = postedFile.FileName;
                var physicalPath = _env.ContentRootPath + "/Photos/" + Filename;

                using (var stream = new FileStream(physicalPath, FileMode.Create))
                {
                    postedFile.CopyTo(stream);
                }
                return new JsonResult(Filename);
            }

            catch (Exception)
            {
                return new JsonResult("anonymous.png");
            }
        }

    }
}
