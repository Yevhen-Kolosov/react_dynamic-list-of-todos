import React, {
  useMemo,
  useState,
} from 'react';
import cn from 'classnames';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { getUser } from '../../api';

type Props = {
  selectedTodo: Todo;
  onClose: () => void;
};

export const TodoModal: React.FC<Props> = ({
  selectedTodo,
  onClose,
}) => {
  const [isModalLoading, setIsModalLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useMemo(() => {
    setIsModalLoading(true);
    getUser(selectedTodo.userId)
      .then(setUser)
      .finally(() => setIsModalLoading(false));
  }, [selectedTodo, setIsModalLoading]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {isModalLoading ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${selectedTodo.id}`}
            </div>

            <button
              aria-label="modal-close"
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={onClose}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {selectedTodo.title}
            </p>

            <p className="block" data-cy="modal-user">
              <strong
                className={cn({
                  'has-text-danger': !selectedTodo.completed,
                  'has-text-success': selectedTodo.completed,
                })}
              >
                {selectedTodo.completed ? 'Done' : 'Planned'}
              </strong>

              {' by '}

              <a href={`mailto:${user?.email}`}>
                {user?.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};