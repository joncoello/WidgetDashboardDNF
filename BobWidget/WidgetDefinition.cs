using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WidgetDashboardDNF.WidgetAPI;

namespace BobWidget
{
    public class WidgetDefinition : IWidget
    {
        public string Name
        {
            get
            {
                return "Bob";
            }
        }

        public string GetHtml()
        {
            return BobWidget.Properties.Resources.index;
        }

        public WidgetLayout Getlayout()
        {
            return new WidgetLayout()
            {
                Width = 3,
                Height = 6
            };
        }
        public string GetScript()
        {
            return BobWidget.Properties.Resources.script;
        }

        public List<string> GetScriptReferences()
        {
            var scripts = new List<string>();
            return scripts;
        }

        public string GetStyle()
        {
            return BobWidget.Properties.Resources.style;
        }

        public List<string> GetStyleReferences()
        {
            return new List<string>();
        }

        public bool HasAuthority()
        {
            return true;
        }
    }
}
