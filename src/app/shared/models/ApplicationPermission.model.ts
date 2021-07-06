export abstract class Permission {
  public static ALL = 'ALL';
  public static SendGrid = {
    FailureMail: {
      ALL: ['SendGrid.FailureMail.Query', 'SendGrid.FailureMail.Unblock'],
      Query: 'SendGrid.FailureMail.Query',
      Unblock: 'SendGrid.FailureMail.Unblock'
    }
  };
  public static AuditLog = {
    ALL: ['AuditLog.Query'],
    Query: 'AuditLog.Query',
  };
  public static User = {
    ALL: ['User.Read', 'User.Add', 'User.Edit', 'User.Delete'],
    Read: 'User.Read',
    Add: 'User.Add',
    Edit: 'User.Edit',
    Delete: 'User.Delete'
  };
  public static Role = {
    ALL: ['Role.Read', 'Role.Add', 'Role.Edit', 'Role.Delete'],
    Read: 'Role.Read',
    Add: 'Role.Add',
    Edit: 'Role.Edit',
    Delete: 'Role.Delete'
  };
  public static Azure = {
    Resource: {
      ALL: ['Azure.Resource.Query'],
      Query: 'Azure.Resource.Query'
    },
    VM: {
      ALL: ['Azure.VM.Query', 'Azure.VM.Operate'],
      Query: 'Azure.VM.Query',
      Operate: 'Azure.VM.Operate'
    },
    WebApps: {
      ALL: ['Azure.WebApps.Query', 'Azure.WebApps.Reboot'],
      Query: 'Azure.WebApps.Query',
      Reboot: 'Azure.WebApps.Reboot'
    }
  };
}

export const PermissionList = [
  ...Permission.AuditLog.ALL,
  ...Permission.Azure.Resource.ALL,
  ...Permission.Azure.VM.ALL,
  ...Permission.Azure.WebApps.ALL,
  ...Permission.SendGrid.FailureMail.ALL,
  ...Permission.User.ALL,
  ...Permission.Role.ALL
];
