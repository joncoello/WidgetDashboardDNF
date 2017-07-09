using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WidgetDashboardDNF.WebHost.Repositories;

namespace WidgetDashboardDNF.WebHost.Controllers
{
    public class HomeController : Controller
    {
        // GET: Home
        public ActionResult Index()
        {
            var widgetRepository = new WidgetRepository();
            var widgetModel = widgetRepository.GetWidgets();

            return View(widgetModel);
        }
    }
}