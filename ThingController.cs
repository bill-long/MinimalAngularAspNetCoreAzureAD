using System.Linq;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

[Authorize]
[Route("api/[controller]")]
public class ThingController : Controller
{
    [HttpGet]
    public ActionResult GetThing()
    {
        var (id, name, upn) = GetUserPropertiesFromClaims(User);
        var thing = new { title = $"Hi {name} <{upn}>!", text = "Here is some text from an authenticated API call." };
        return Json(thing);
    }

    private static (string Id, string Name, string UPN) GetUserPropertiesFromClaims(ClaimsPrincipal principal)
    {
        return (principal.Claims
                .First(c => c.Type == "http://schemas.microsoft.com/identity/claims/objectidentifier").Value,
            principal.Claims.First(c => c.Type == "name").Value,
            principal.Claims.First(c => c.Type == "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/upn")
                .Value);
    }
}