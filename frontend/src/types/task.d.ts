interface Task {
  id: integer;
  title: string;
  description: string;
  status: string;
  user_id: integer;
  updated_at: string;
  created_at: string;
  pivot?: {
    user_id: integer;
    task_id: integer;
    permission: string;
  };
}

interface State {
  loading: boolean;
  newTask: boolean;
  tasks: Task[];
  task: Task | null;
  editTask: Task | null;
  error: String | null;
}

interface StateAction {
  type: string;
  payload?: any;
}

interface StateDispatch {
  ({ type, payload }: StateAction): void;
}
