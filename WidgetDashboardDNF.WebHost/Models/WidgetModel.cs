using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WidgetDashboardDNF.WebHost.Models
{
    public class WidgetModel
    {
        public List<WidgetItem> Widgets { get; private set; }

        public WidgetModel()
        {
            Widgets = new List<WidgetItem>();
        }

    }
}