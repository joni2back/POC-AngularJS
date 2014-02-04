using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace AngularJS.Web.Utils
{
    public static class HtmlHelperExtensions
    {
        public static string GetControllerName(this HtmlHelper helper)
        {
            return CultureInfo.CurrentCulture.TextInfo.ToTitleCase(helper.ViewContext.RouteData.Values["controller"].ToString());
        }
    }
}