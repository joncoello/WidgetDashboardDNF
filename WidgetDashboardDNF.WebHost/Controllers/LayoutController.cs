using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WidgetDashboardDNF.WebHost.Repositories;

namespace WidgetDashboardDNF.WebHost.Controllers
{
    public class LayoutController : ApiController
    {
        public IHttpActionResult Get()
        {

            var layoutRepository = new LayoutRepository();
            var model = layoutRepository.Load();

            return Ok(model);
        }

        public IHttpActionResult Post([FromBody]IEnumerable<Models.LayoutModel> layout)
        {

            var layoutRepository = new LayoutRepository();
            layoutRepository.Save(layout);

            return Ok();
        }
        
    }
}
