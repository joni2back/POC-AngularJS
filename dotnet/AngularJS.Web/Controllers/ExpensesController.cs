using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace AngularJS.Web.Controllers
{
    public class ExpensesController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

    }
}
