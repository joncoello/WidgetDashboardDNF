using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;

namespace WidgetDashboardDNF.WebHost.Repositories
{
    public class LayoutRepository
    {

        private const string LAYOUT_FILENAME = "layout.json";

        private string _layoutPath;

        public LayoutRepository()
        {
            _layoutPath = Path.Combine(Path.GetTempPath(), "WidgetLayoutRepo");
        }

        public void Save(IEnumerable<Models.LayoutModel> layout) {

            if (!Directory.Exists(_layoutPath)) {
                Directory.CreateDirectory(_layoutPath);
            }

            var layoutJson = JsonConvert.SerializeObject(layout);

            File.WriteAllText(Path.Combine(_layoutPath, LAYOUT_FILENAME), layoutJson);

        }

        public IEnumerable<Models.LayoutModel> Load()
        {

            IEnumerable<Models.LayoutModel> layout = new List<Models.LayoutModel>();

            if (File.Exists(Path.Combine(_layoutPath, LAYOUT_FILENAME))) {

                var layoutJson = File.ReadAllText(Path.Combine(_layoutPath, LAYOUT_FILENAME));

                layout = JsonConvert.DeserializeObject<IEnumerable<Models.LayoutModel>>(layoutJson);

            }

            return layout;
        }

    }
}