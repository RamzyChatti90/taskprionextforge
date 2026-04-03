package com.taskprionextforge.repository;

import com.taskprionextforge.domain.Task;
import com.taskprionextforge.domain.enumeration.TaskStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data JPA repository for the Task entity.
 * Extends with custom methods for the dashboard.
 */
@SuppressWarnings("unused")
@Repository
public interface TaskRepository extends JpaRepository<Task, Long>, JpaSpecificationExecutor<Task> {

    /**
     * Find all tasks assigned to a specific user.
     *
     * @param login the login of the assigned user.
     * @param pageable the pagination information.
     * @return the list of tasks.
     */
    Page<Task> findAllByAssignedToUserLogin(String login, Pageable pageable);

    /**
     * Find all tasks assigned to a specific user with a given status.
     *
     * @param login the login of the assigned user.
     * @param status the status of the tasks.
     * @param pageable the pagination information.
     * @return the list of tasks.
     */
    Page<Task> findAllByAssignedToUserLoginAndStatus(String login, TaskStatus status, Pageable pageable);

    /**
     * Find all tasks assigned to a specific user by their ID.
     * This method is useful if the relationship is directly to User entity ID.
     * Assuming 'assignedTo' is a User entity with a 'login' field.
     * If the relationship is directly to a User ID, this method might be needed.
     * For simplicity, using login from `findAllByAssignedToUserLogin` is preferred.
     */
    // Optional: List<Task> findByAssignedToId(Long userId);
}