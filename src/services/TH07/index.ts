export const filterTasksLocal = (tasks: any[], params: any) => {
  let data = [...tasks];
  if (params.title) {
    data = data.filter(i => i.title.toLowerCase().includes(params.title.toLowerCase()));
  }
  if (params.assignee) {
    data = data.filter(i => i.assignee === params.assignee);
  }
  if (params.status) {
    data = data.filter(i => i.status === params.status);
  }
  return data;
};