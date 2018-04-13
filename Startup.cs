using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;

namespace MinimalAngularAspNetCoreAzureAD
{
    public class Startup
    {
        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc();

            const string tenant = "5168560b-873c-42c2-aec8-3c06b70424b6";
            const string appId = "e3cb70f2-eae4-4872-94a4-9be8a98655d7";

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(options =>
            {
                options.Audience = appId;
                options.Authority = $"https://sts.windows.net/{tenant}/";
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            // This stuff should NOT be routed to angular
            var nonAngularRoutes = new Regex(@"$(?<=\.(js|json|ts|html|css|map|woff|woff2|ttf|gif))|^/api/");

            app.Use(async (context, next) =>
            {
                // If the request is an Angular route, rewrite the path to point to the front end.
                // This needs to happen before UseDefaultFiles.
                if (context.Request.Path.HasValue && context.Request.Path != "/" &&
                    !nonAngularRoutes.IsMatch(context.Request.Path.Value))
                {
                    context.Request.Path = new PathString("/");
                }

                await next();
            });

            app.UseAuthentication();
            app.UseDefaultFiles();
            app.UseStaticFiles();
            app.UseMvc();
        }
    }
}
