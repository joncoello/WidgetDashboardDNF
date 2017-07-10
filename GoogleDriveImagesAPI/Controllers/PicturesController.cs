using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using Google.Apis.Auth.OAuth2;
using Google.Apis.Drive.v3;
using Google.Apis.Drive.v3.Data;
using Google.Apis.Services;
using Google.Apis.Util.Store;
using System.Web.Http;
using System.IO;
using System.Threading;
using System.Drawing;
using System.Net.Http.Headers;

namespace GoogleDriveImagesAPI.Controllers
{
    public class PicturesController : ApiController
    {

        // If modifying these scopes, delete your previously saved credentials
        // at ~/.credentials/drive-dotnet-quickstart.json
        static string[] Scopes = { DriveService.Scope.DriveReadonly };
        static string ApplicationName = "Drive API .NET Quickstart";
        private DriveService service;

        public PicturesController()
        {
            UserCredential credential;

            string credPath = System.Environment.GetFolderPath(
                System.Environment.SpecialFolder.Personal);
            credPath = Path.Combine(credPath, ".credentials/drive-dotnet-quickstart.json");

            credential = GoogleWebAuthorizationBroker.AuthorizeAsync(
                GoogleClientSecrets.Load(new MemoryStream(GoogleDriveImagesAPI.Properties.Resources.client_secret)).Secrets,
                Scopes,
                "user",
                CancellationToken.None,
                new FileDataStore(credPath, true)).Result;
            Console.WriteLine("Credential file saved to: " + credPath);

            // Create Drive API service.
            service = new DriveService(new BaseClientService.Initializer()
            {
                HttpClientInitializer = credential,
                ApplicationName = ApplicationName,
            });
        }

        public List<Models.PictureItem> Get()
        {

            var pictures = new List<Models.PictureItem>();

            var folderRequest = service.Files.List();
            folderRequest.Q = "name = 'WidgetImages' and mimeType = 'application/vnd.google-apps.folder'";
            folderRequest.Spaces = "drive";
            folderRequest.Fields = "nextPageToken, files(id, name)";
            var result = folderRequest.Execute();
            if (result.Files.Count == 1)
            {
                var folderID = result.Files[0].Id;

                var imagesRequest = service.Files.List();
                imagesRequest.Q = $"'{folderID}' in parents";
                imagesRequest.Spaces = "drive";
                imagesRequest.Fields = "nextPageToken, files(id, name)";
                var imagesResult = imagesRequest.Execute();

                foreach (var file in imagesResult.Files)
                {
                    pictures.Add(new Models.PictureItem() {
                        ID = file.Id,
                        Name = file.Name
                    });
                }

            }

            return pictures;

        }

        public object Get(string id) {

            var request = service.Files.Get(id);
            var stream = new System.IO.MemoryStream();
            request.Download(stream);

            Image img = Image.FromStream(stream);
            using (MemoryStream ms = new MemoryStream())
            {
                img.Save(ms, System.Drawing.Imaging.ImageFormat.Png);
                HttpResponseMessage result = new HttpResponseMessage(HttpStatusCode.OK);
                result.Content = new ByteArrayContent(ms.ToArray());
                result.Content.Headers.ContentType = new MediaTypeHeaderValue("image/jpeg");
                return result;
            }

        }

    }
}
