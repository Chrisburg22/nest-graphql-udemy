import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';

@Controller('todo')
export class TodoController {
  //Injeccion de dependencia
  constructor(private readonly todoService: TodoService) {}

  //Como podemos ver en cada funcion podemos ver una misma estructura la cual es: 
  //Un tipo de solicitud y retornar algun metodo de la instancia de los serivios
  @Post()
  create(@Body() createTodoDto: CreateTodoDto): Todo {
    return this.todoService.create(createTodoDto);
  }

  @Get()
  findAll(): Todo[] {
    return this.todoService.findAll();
  }

  @Get(':id')
  //ParseInPipe nos permita definir de que tipo sera el param que vamos a recibir y transformando el string a ese tipo
  //Esto nos asegura que todo lo que se mande siempre se puede transformar en un numero.
  findOne(@Param('id', ParseIntPipe) id: number): Todo {
    console.log(typeof(+id));

    return this.todoService.findOne(+id);//Con el signo más los convertimos en un numero.
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    return this.todoService.update(+id, updateTodoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.todoService.remove(+id);
  }
}
