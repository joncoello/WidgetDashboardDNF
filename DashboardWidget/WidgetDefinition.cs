﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WidgetDashboardDNF.WidgetAPI;

namespace DashboardWidget
{
    public class WidgetDefinition : IWidget
    {
        public string Name
        {
            get
            {
                return "Dashboard Widget";
            }
        }

        public string GetHtml()
        {
            return DashboardWidget.Properties.Resources.index;
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
            return DashboardWidget.Properties.Resources.script;
        }

        public List<string> GetScriptReferences()
        {
            var scripts = new List<string>();
            return scripts;
        }

        public string GetStyle()
        {
            return DashboardWidget.Properties.Resources.style;
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
