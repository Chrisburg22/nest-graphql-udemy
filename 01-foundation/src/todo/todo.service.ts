import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';

@Injectable()
export class TodoService {

  private todos: Todo[] = [
    {id: 1, description: 'Piedra del Alma', done: false},
    {id: 2, description: 'Piedra del Tiempo', done: false},
    {id: 3, description: 'Piedra del Espacio', done: true}
  ]

  create({ description}: CreateTodoDto) {
    
    const todo = new Todo();
    todo.id = this.todos.length+1;
    todo.description = description;

    this.todos.push( todo );

    return todo;
  }

  findAll() {
    return this.todos;
  }

  findOne(id: number): Todo {
    const todo = this.todos.find( todo => todo.id === id);
    if( !todo ) throw  new NotFoundException(`Todo with #${id} not found`);

    return todo;
  }

  update(id: number, updateTodoDto: UpdateTodoDto) {
    return `This action updates a #${id} todo`;
  }

  remove(id: number) {
    return `This action removes a #${id} todo`;
  }
}
