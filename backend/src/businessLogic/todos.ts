import { TodosAccess } from '../dataLayer/todosAccess'
import { AttachmentUtils } from '../helpers/attachmentUtils';
import { TodoItem } from '../models/TodoItem'
import { CreateTodoRequest } from '../requests/CreateTodoRequest'
import { UpdateTodoRequest } from '../requests/UpdateTodoRequest'
import { createLogger } from '../utils/logger'
import * as uuid from 'uuid'
import { TodoUpdate } from '../models/TodoUpdate';
//import * as createError from 'http-errors'

// TODO: Implement businessLogic
const logger = createLogger('TodosController')
const attachmentUtils = new AttachmentUtils()
const todosAccess = new TodosAccess()

// Write get todos function
export async function getTodosForUser(userId: string): Promise<TodoItem[]> {
    logger.info('Get todos for user function called')
    return todosAccess.getAllTodos(userId)
}

// Write create todo function
export async function createTodo(
  newTodo: CreateTodoRequest,
  userId: string
): Promise<TodoItem> {
  logger.info('Create todo function called')

  const todoId = uuid.v4()
  const createdAt = new Date().toISOString()
  const newItem = {
    userId,
    todoId,
    createdAt,
    done: false,
    ...newTodo
  }

  return await todosAccess.createTodoItem(newItem)
}  

export async function updateTodo(
  todoId: string,
  todoUpdate: UpdateTodoRequest,
  userId: string
): Promise<TodoUpdate> {
  logger.info('Update todo function called')

  return await todosAccess.updateTodoItem(todoId,todoUpdate,userId)
}

export async function deleteTodo(
  todoId: string,
  userId: string
): Promise<string> {
  logger.info('Delete todo function called')

  return await todosAccess.deleteTodoItem(todoId,userId)
}

export async function createAttachmentPresignedUrl(
  todoId: string,
  userId: string
): Promise<string> {
  logger.info('createAttachmentPresignedUrl  function called by user', userId,todoId)

  return attachmentUtils.getUploadUrl(todoId)
}
