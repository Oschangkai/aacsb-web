export abstract class Permission {
  public static ALL = 'ALL';
  public static SendGrid = {
    FailureMail: {
      ALL: ['SendGrid.FailureMail.Query', 'SendGrid.FailureMail.Unblock'],
      Query: 'SendGrid.FailureMail.Query',
      Unblock: 'SendGrid.FailureMail.Unblock'
    }
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
}
