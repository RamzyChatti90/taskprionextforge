package com.taskprionextforge.service;

import com.taskprionextforge.domain.Task;
import com.taskprionextforge.domain.enumeration.TaskStatus;
import com.taskprionextforge.repository.TaskRepository;
import com.taskprionextforge.service.dto.TaskDTO;
import com.taskprionextforge.service.mapper.TaskMapper;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing {@link Task}.
 * Extends with custom methods for dashboard functionality.
 */
@Service
@Transactional
public class TaskService {

    private final Logger log = LoggerFactory.getLogger(TaskService.class);

    private final TaskRepository taskRepository;

    private final TaskMapper taskMapper;

    public TaskService(TaskRepository taskRepository, TaskMapper taskMapper) {
        this.taskRepository = taskRepository;
        this.taskMapper = taskMapper;
    }

    /**
     * Save a task.
     *
     * @param taskDTO the entity to save.
     * @return the persisted entity.
     */
    public TaskDTO save(TaskDTO taskDTO) {
        log.debug("Request to save Task : {}", taskDTO);
        Task task = taskMapper.toEntity(taskDTO);
        task = taskRepository.save(task);
        return taskMapper.toDto(task);
    }

    /**
     * Partially update a task.
     *
     * @param taskDTO the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<TaskDTO> partialUpdate(TaskDTO taskDTO) {
        log.debug("Request to partially update Task : {}", taskDTO);

        return taskRepository
            .findById(taskDTO.getId())
            .map(existingTask -> {
                taskMapper.partialUpdate(existingTask, taskDTO);

                return existingTask;
            })
            .map(taskRepository::save)
            .map(taskMapper::toDto);
    }

    /**
     * Get all the tasks.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<TaskDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Tasks");
        return taskRepository.findAll(pageable).map(taskMapper::toDto);
    }

    /**
     * Get one task by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<TaskDTO> findOne(Long id) {
        log.debug("Request to get Task : {}", id);
        return taskRepository.findById(id).map(taskMapper::toDto);
    }

    /**
     * Delete the task by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Task : {}", id);
        taskRepository.deleteById(id);
    }

    /**
     * Get all tasks assigned to a specific user, optionally filtered by status.
     *
     * @param userLogin the login of the user to whom tasks are assigned.
     * @param status an optional status to filter tasks.
     * @param pageable the pagination information.
     * @return the list of tasks assigned to the user, as DTOs.
     */
    @Transactional(readOnly = true)
    public Page<TaskDTO> findUserTasks(String userLogin, Optional<TaskStatus> status, Pageable pageable) {
        log.debug("Request to get Tasks for user {} with status {}", userLogin, status);
        if (status.isPresent()) {
            return taskRepository.findAllByAssignedToUserLoginAndStatus(userLogin, status.get(), pageable)
                .map(taskMapper::toDto);
        } else {
            return taskRepository.findAllByAssignedToUserLogin(userLogin, pageable)
                .map(taskMapper::toDto);
        }
    }
}