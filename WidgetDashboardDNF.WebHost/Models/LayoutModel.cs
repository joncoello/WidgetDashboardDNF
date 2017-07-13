using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WidgetDashboardDNF.WebHost.Models
{

    //"[{"name":"Dashboard Widget","x":"0","y":"0","width":"3","height":"6"}]"

    public class LayoutModel
    {
        public string Name { get; set; }
        public string X { get; set; }
        public string Y { get; set; }
        public string Width { get; set; }
        public string Height { get; set; }
        public Dictionary<string, string> Customisation { get; set; }

    }
}