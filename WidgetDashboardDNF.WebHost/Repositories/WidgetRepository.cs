using System;
using System.Collections.Generic;
using System.Composition.Convention;
using System.Composition.Hosting;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Text.RegularExpressions;
using System.Web;
using WidgetDashboardDNF.WebHost.Models;
using WidgetDashboardDNF.WidgetAPI;

namespace WidgetDashboardDNF.WebHost.Repositories
{
    public class WidgetRepository
    {

        private const string WIDGET_FILE_PATTERN = "*Widget*.dll";

        public WidgetModel GetWidgets()
        {

            var model = new WidgetModel();

            var assemblies = FetchAssemblies();
            var container = GetContainer(assemblies);
            var widgets = container.GetExports<IWidget>();

            foreach (var widget in widgets)
            {
                model.Widgets.Add(CreateWidget(widget));
            }

            return model;

        }

        private IEnumerable<Assembly> FetchAssemblies()
        {
            var path = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "bin");
            var assemblies = Directory
            .GetFiles(path, WIDGET_FILE_PATTERN, SearchOption.TopDirectoryOnly)
            .Select(Assembly.LoadFile)
            .ToList();
            return assemblies;
        }

        private CompositionHost GetContainer(IEnumerable<Assembly> assemblies)
        {
            var conventions = new ConventionBuilder();
            conventions.ForTypesDerivedFrom<IWidget>().Export<IWidget>();
            return new ContainerConfiguration().WithAssemblies(assemblies, conventions).CreateContainer();
        }

        private WidgetItem CreateWidget(IWidget widget)
        {

            var widgetItem = new WidgetItem
            {
                Name = widget.Name,
                Template = GetBody(widget.GetHtml()),
                Script = widget.GetScript(),
                ScriptReferences = widget.GetScriptReferences(),
                Style = widget.GetStyle(),
                StyleReferences = widget.GetStyleReferences(),
                Layout = widget.Getlayout()
            };

            widgetItem.Template = ReplaceThisWithID(widgetItem.Template, widgetItem.ID);
            widgetItem.Script = ReplaceThisWithID(widgetItem.Script, widgetItem.ID);

            return widgetItem;

        }

        private string ReplaceThisWithID(string text, Guid ID)
        {
            return text.Replace("this", ID.ToString());
        }

        private string GetBody(string html)
        {

            var pattern = "<!--bodystart-->(.*?)<!--bodyend-->";
            var regex = new Regex(pattern, RegexOptions.Singleline);
            var match = regex.Match(html);
            var value = match.Value;

            return value;
        }

    }
}