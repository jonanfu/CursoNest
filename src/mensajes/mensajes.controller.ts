import { Controller, Post, Body, Get, Put, Delete, HttpStatus, Res, Param } from '@nestjs/common';
import {CreateMensajeDto} from './dto/create-mensaje-dto';
import { MensajesService } from './mensajes.service';
import { response } from 'express';
@Controller('mensajes') 
export class MensajesController {
    constructor(private mensajeService: MensajesService){

    }


    @Post()
    create(@Body() createMensajeDto: CreateMensajeDto, @Res() response){
        this.mensajeService.createMensaje(createMensajeDto).then( mensaje => {
            response.status(HttpStatus.CREATED).json(mensaje);
        }).catch( () => {
            response.status(HttpStatus.FORBIDDEN).json({mensaje: 'Error en la creacion del mensaje'});
        });
    }

    @Get()
    getAll(@Res() response){
        this.mensajeService.getAll().then(mensajeList => {
            response.status(HttpStatus.OK).json(mensajeList);
        }).catch( () => {
            response.status(HttpStatus.FORBIDDEN).json({mensaje: 'Error en la creacion del mensaje'});
        });
    }

    @Put(':id')
    update(@Body() updateMensajeDto: CreateMensajeDto, @Res() response, @Param('id') idMensaje){
        this.mensajeService.updateMensaje(idMensaje, updateMensajeDto).then(mensaje => {
            response.status(HttpStatus.OK).json(mensaje);
        }).catch( () => {
            response.status(HttpStatus.FORBIDDEN).json({mensaje: 'Error en la creacion del mensaje'});
        });
    }

    @Delete(':id')
    delete(@Res() response, @Param('id') idMensaje){
        this.mensajeService.deleteMensaje(idMensaje).then(res =>{
            response.status(HttpStatus.OK).json(res)
        }).catch( () => {
            response.status(HttpStatus.FORBIDDEN).json({Mensaje: 'Error en la eliminacion'});
        });
    }
}
