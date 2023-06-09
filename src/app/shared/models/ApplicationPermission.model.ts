export class AACSBAction {
    public static View: string = "View";
    public static Search: string = "Search";
    public static Create: string = "Create";
    public static Update: string = "Update";
    public static Delete: string = "Delete";
    public static Export: string = "Export";
    public static Import: string = "Import";
    public static Generate: string = "Generate";
    public static Clean: string = "Clean";
    public static UpgradeSubscription: string = "UpgradeSubscription";
}

export class AACSBResource {
    public static Tenants: string = "Tenants";
    public static Dashboard: string = "Dashboard";
    public static Hangfire: string = "Hangfire";
    public static Users: string = "Users";
    public static UserRoles: string = "UserRoles";
    public static Roles: string = "Roles";
    public static RoleClaims: string = "RoleClaims";
    public static Products: string = "Products";
    public static Brands: string = "Brands";
    public static ReportData: string = "ReportData";
    public static Report: string = "Report";
}
export abstract class Permission {
  public static nameFor = (resource: AACSBResource, action: AACSBAction): string => `Permissions.${resource}.${action}`;
  public static ALL = 'ALL';
  public static Dashboard = {
    ALL: [Permission.nameFor(AACSBResource.Dashboard, AACSBAction.View)],
    View: Permission.nameFor(AACSBResource.Dashboard, AACSBAction.View)
  };
  public static Hangfire = {
    ALL: [Permission.nameFor(AACSBResource.Hangfire, AACSBAction.View)],
    View: Permission.nameFor(AACSBResource.Hangfire, AACSBAction.View)
  };
  public static Tenants = {
    ALL: [
      Permission.nameFor(AACSBResource.Tenants, AACSBAction.View),
      Permission.nameFor(AACSBResource.Tenants, AACSBAction.Create),
      Permission.nameFor(AACSBResource.Tenants, AACSBAction.Update),
      Permission.nameFor(AACSBResource.Tenants, AACSBAction.UpgradeSubscription)
    ],
    View: Permission.nameFor(AACSBResource.Tenants, AACSBAction.View),
    Create: Permission.nameFor(AACSBResource.Tenants, AACSBAction.Create),
    Update: Permission.nameFor(AACSBResource.Tenants, AACSBAction.Update),
    UpgradeSubscription: Permission.nameFor(AACSBResource.Tenants, AACSBAction.UpgradeSubscription),
  };
  // System
  public static Users = {
    ALL: [
      Permission.nameFor(AACSBResource.Users, AACSBAction.View),
      Permission.nameFor(AACSBResource.Users, AACSBAction.Search),
      Permission.nameFor(AACSBResource.Users, AACSBAction.Create),
      Permission.nameFor(AACSBResource.Users, AACSBAction.Update),
      Permission.nameFor(AACSBResource.Users, AACSBAction.Delete),
      Permission.nameFor(AACSBResource.Users, AACSBAction.Export)
    ],
    View: Permission.nameFor(AACSBResource.Users, AACSBAction.View),
    Search: Permission.nameFor(AACSBResource.Users, AACSBAction.Search),
    Create: Permission.nameFor(AACSBResource.Users, AACSBAction.Create),
    Update: Permission.nameFor(AACSBResource.Users, AACSBAction.Update),
    Delete: Permission.nameFor(AACSBResource.Users, AACSBAction.Delete),
    Export: Permission.nameFor(AACSBResource.Users, AACSBAction.Export)
  };
  public static UserRoles = {
    ALL: [
      Permission.nameFor(AACSBResource.UserRoles, AACSBAction.View),
      Permission.nameFor(AACSBResource.UserRoles, AACSBAction.Update)
    ],
    View: Permission.nameFor(AACSBResource.UserRoles, AACSBAction.View),
    Update: Permission.nameFor(AACSBResource.UserRoles, AACSBAction.Update)
  };
  public static Role = {
    ALL: [
      Permission.nameFor(AACSBResource.Roles, AACSBAction.View),
      Permission.nameFor(AACSBResource.Roles, AACSBAction.Create),
      Permission.nameFor(AACSBResource.Roles, AACSBAction.Update),
      Permission.nameFor(AACSBResource.Roles, AACSBAction.Delete)
    ],
    View: Permission.nameFor(AACSBResource.Roles, AACSBAction.View),
    Create: Permission.nameFor(AACSBResource.Roles, AACSBAction.Create),
    Update: Permission.nameFor(AACSBResource.Roles, AACSBAction.Update),
    Delete: Permission.nameFor(AACSBResource.Roles, AACSBAction.Delete)
  };
  public static RoleClaims = {
    ALL: [
      Permission.nameFor(AACSBResource.RoleClaims, AACSBAction.View),
      Permission.nameFor(AACSBResource.RoleClaims, AACSBAction.Update)
    ],
    View: Permission.nameFor(AACSBResource.RoleClaims, AACSBAction.View),
    Update: Permission.nameFor(AACSBResource.RoleClaims, AACSBAction.Update)
  };
  // Catalog
  public static Products = {
    ALL: [
      Permission.nameFor(AACSBResource.Products, AACSBAction.View),
      Permission.nameFor(AACSBResource.Products, AACSBAction.Search),
      Permission.nameFor(AACSBResource.Products, AACSBAction.Create),
      Permission.nameFor(AACSBResource.Products, AACSBAction.Update),
      Permission.nameFor(AACSBResource.Products, AACSBAction.Delete),
      Permission.nameFor(AACSBResource.Products, AACSBAction.Export)
    ],
    View: Permission.nameFor(AACSBResource.Products, AACSBAction.View),
    Search: Permission.nameFor(AACSBResource.Products, AACSBAction.Search),
    Create: Permission.nameFor(AACSBResource.Products, AACSBAction.Create),
    Update: Permission.nameFor(AACSBResource.Products, AACSBAction.Update),
    Delete: Permission.nameFor(AACSBResource.Products, AACSBAction.Delete),
    Export: Permission.nameFor(AACSBResource.Products, AACSBAction.Export)
  }
  public static Brands = {
    ALL: [
      Permission.nameFor(AACSBResource.Brands, AACSBAction.View),
      Permission.nameFor(AACSBResource.Brands, AACSBAction.Search),
      Permission.nameFor(AACSBResource.Brands, AACSBAction.Create),
      Permission.nameFor(AACSBResource.Brands, AACSBAction.Update),
      Permission.nameFor(AACSBResource.Brands, AACSBAction.Delete),
      Permission.nameFor(AACSBResource.Brands, AACSBAction.Generate),
      Permission.nameFor(AACSBResource.Brands, AACSBAction.Clean)
    ],
    View: Permission.nameFor(AACSBResource.Brands, AACSBAction.View),
    Search: Permission.nameFor(AACSBResource.Brands, AACSBAction.Search),
    Create: Permission.nameFor(AACSBResource.Brands, AACSBAction.Create),
    Update: Permission.nameFor(AACSBResource.Brands, AACSBAction.Update),
    Delete: Permission.nameFor(AACSBResource.Brands, AACSBAction.Delete),
    Generate: Permission.nameFor(AACSBResource.Brands, AACSBAction.Generate),
    Clean: Permission.nameFor(AACSBResource.Brands, AACSBAction.Clean)
  }
  // Report Generator
  public static ReportData = {
    ALL: [
      Permission.nameFor(AACSBResource.ReportData, AACSBAction.Import)
    ],
    Import: Permission.nameFor(AACSBResource.ReportData, AACSBAction.Import)
  }
  public static Report = {
    ALL: [
      Permission.nameFor(AACSBResource.Report, AACSBAction.View)
    ],
    View: Permission.nameFor(AACSBResource.Report, AACSBAction.View)
  }
}

export const PermissionList = [
  ...Permission.Dashboard.ALL,
  ...Permission.Hangfire.ALL,
  ...Permission.Users.ALL,
  ...Permission.Role.ALL,
  ...Permission.RoleClaims.ALL,
  ...Permission.UserRoles.ALL,
  ...Permission.Tenants.ALL,
  ...Permission.Products.ALL,
  ...Permission.Brands.ALL,
  ...Permission.ReportData.ALL,
  ...Permission.Report.ALL
];