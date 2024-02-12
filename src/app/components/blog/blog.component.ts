import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css'
})

export class BlogComponent implements OnInit {
  noticias: any[] = [];

  nuevaNoticia = {
    titulo: '',
    imagen: '',
    texto: '',
    author: '',
    fecha: new Date(),
    id: 0
  };

  palabraClave: string = '';
  sugerencias: string[] = [];
  noticiaSeleccionada: any;

  ngOnInit() {
    const storedNoticias = localStorage.getItem('noticias');
    if (storedNoticias) {
      this.noticias = JSON.parse(storedNoticias);
    }

    const noticiaEjemploEliminada = localStorage.getItem('noticiaEjemploEliminada');
    if (!this.noticias.length && !noticiaEjemploEliminada) {
      this.agregarNoticiaEjemplo();
    }

    this.noticias.forEach((noticia, index) => {
      noticia.id = index + 1;
    });
  }

  agregarNoticia() {
    if (this.nuevaNoticia.titulo && this.nuevaNoticia.imagen && this.nuevaNoticia.texto) {
      this.noticias.push({...this.nuevaNoticia});
      localStorage.setItem('noticias', JSON.stringify(this.noticias));
      this.nuevaNoticia = {
        titulo: '',
        imagen: '',
        texto: '',
        author: '',
        fecha: new Date(),
        id: 0
      };
    } else {
      alert('Por favor, completa todos los campos.');
    }
  }

  borrarNoticia(index: number) {
    if (index === this.noticias.length - 1) {
      localStorage.removeItem('noticiaEjemploEliminada');
    } else {
      this.noticias.splice(index, 1);
      localStorage.setItem('noticias', JSON.stringify(this.noticias));
    }
  }

  private agregarNoticiaEjemplo() {
    this.noticias.push({
      titulo: 'Silent Hill 2 Remake',
      imagen: './assets/img/silenthill2.jpg',
      texto: 'Nada se vislumbra entre la vaporosa niebla del pueblo maldito. Cuando la oscuridad se cierne sobre sus abandonadas calles, las pesadillas cobran vida y los monstruos acechan como sombras mortíferas. La misma negrura rodea a Silent Hill 2 Remake, el título desarrollado por Bloober Team, creadores de Layers of Fear y The Medium. Ante la falta de información por parte de Konami, el estudio ha salido al paso de los rumores y los ha acallado tan rápido como la espada de Cabeza Piramidal, que cercena cabezas en un abrir y cerrar de ojos. A través de un comunicado publicado en las redes sociales, los desarrolladores se han mostrado orgullosos de formar parte de los planes de la saga: “Junto a nuestro socio, estamos trabajando diligentemente para garantizar que Silent Hill 2 Remake tenga la máxima calidad”, han asegurado. “De parte de nuestro equipo de desarrollo, queremos aclarar que la producción está progresando bien y de acuerdo con nuestro calendario. Comprendemos que muchos jugadores de todo el mundo estén esperando con ganas noticias sobre el juego, apreciamos vuestra dedicación. Sin embargo, os pedimos amablemente que tengáis un poco más de paciencia” Es Konami, como editora del juego, la que compartirá más información. “Nos mostramos confiados de que la espera valdrá la pena”, han añadido.',
      author: 'MeriSation',
      fecha: new Date()
    });
    this.noticias.push({
      titulo: 'Resident Evil 3, análisis:',
      imagen: './assets/img/RESIDENTEVIL3.jpg',
      texto: 'Se repiten las decisiones clave de Capcom de hace más de veinte años: para no tardar demasiado entre uno y otro juego (aquella vez era porque se les echaba encima el lanzamiento de Playstation 2, esta vez... bueno, porque los excelentes resultados del remake de Resident Evil 2 deben haber sido muy tentadores) vuelven escenarios y mecánicas de la anterior entrega. El resultado es un juego potente, con ideas y que sin duda garantiza unas cuantas horas de tensión y suspense. Pero es casi un spin-off, un extra del extraordinario RE2 Remake que un juego con auténtica entidad propia.Pero claro, cómo quejarse: aquí hemos venido a lo que hemos venido, es decir, a una repetición de lo que vimos en el Resident Evil 3 original y allí la cosa ya era derivativa y no demasiado innovadora. Es normal que esas circunstancias se repitan de nuevo, lo que no quiere decir que estemos ante un mal juego: recordemos que Nemesis es uno de los enemigos más icónicos de la saga, Jill Valentine una de sus heroínas más queridas y todo el arranque del juego en una Raccoon City arrasada, aunque recuerde a la segunda entrega, está entre las mejores ubicaciones de la serie. Lo que tenemos es un juego impecable técnicamente, que hace un uso espectacular del motor gráfico y que incluso va más allá del anterior remake en ese sentido, con efectos y escenarios absolutamente impresionantes. También hace un esfuerzo al revisar mecánicas y recursos del anterior juego: se introduce un útil botón de esquiva -que incluso, pulsado en el momento preciso, dispara un curioso efecto bullet-time que convierte cada encuentro con una criatura, casi literalmente, en un minijuego- y hay leves modificaciones en los controles.',
      author: 'Xataka',
      fecha: new Date()
    });
  }

  filtrarNoticias() {
    let noticiasFiltradas = this.noticias;

    if (this.palabraClave.trim() !== '') {
      noticiasFiltradas = this.noticias.filter(noticia =>
        noticia.titulo.toLowerCase().includes(this.palabraClave.toLowerCase())
      );
    }
    if (this.noticiaSeleccionada) {
      noticiasFiltradas = noticiasFiltradas.filter(noticia =>
        noticia !== this.noticiaSeleccionada
      );
      noticiasFiltradas.unshift(this.noticiaSeleccionada);
    }

    return noticiasFiltradas;
  }

  actualizarSugerencias() {
    this.sugerencias = this.noticias
      .map(noticia => noticia.titulo)
      .filter(titulo => titulo.toLowerCase().includes(this.palabraClave.toLowerCase()));
  }

   seleccionarSugerencia(sugerencia: string) {
     const noticiaSeleccionada = this.noticias.find(noticia => noticia.titulo === sugerencia);

     if (noticiaSeleccionada) {
       this.noticiaSeleccionada = noticiaSeleccionada;
       this.palabraClave = '';
     }
  }
}

