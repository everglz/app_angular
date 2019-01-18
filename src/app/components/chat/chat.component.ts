import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {

  texto = '';
  mensajesSubscripcion: Subscription;
  elemento: HTMLElement;
  mensajes: any[] = [];

  constructor(
    // Para poder enviar mensajes
    public chatService: ChatService
  ) { }

  ngOnInit() {
    this.elemento = document.getElementById('chat-mensajes');
    // Destruir esta subscripción cuando ya no se ocupa
    this.mensajesSubscripcion = this.chatService.getMessages().subscribe( msg => {
      // console.log( msg );
      // Publicar mensaje
      this.mensajes.push( msg );
      // Mover el scroll automaticamente al último mensaje recibido
      setTimeout(() => {
        this.elemento.scrollTop = this.elemento.scrollHeight;
      }, 50);
    });
  }

  ngOnDestroy() {
    this.mensajesSubscripcion.unsubscribe();
  }

  enviar() {
    if ( this.texto.trim().length === 0 ){ return; }
    // Envia mensaje al servidor
    this.chatService.sendMessage( this.texto );
    this.texto = '';
  }

}
