import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import jsonData from "./Model/blogs.json";
import moment from 'moment';


interface Blog {
  titre: string;
  image: string;
  text: string;
  auteur: string;
  date: string;
  id: number;
}

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css'
})

export class BlogComponent implements OnInit {
  //blogs: any[] = jsonData.blogs;
  
  blogs: Blog[] = jsonData.blogs;

  nouveauBlog = {
    titre: '',
    image: '',
    text: '',
    auteur: '',
    date: '',
    id: 0
  };

  keyWord: string = '';
  suggestions: string[] = [];
  blogSelectionne: any;

  ngOnInit(): void {}

  /*ngOnInit() {
    const blogsEnStock = localStorage.getItem('blogs');
    if (blogsEnStock) {
      this.blogs = JSON.parse(blogsEnStock);
    }

    this.blogs.forEach((blog, index) => {
      blog.id = index + 1;
    });
  }*/

  ajouterBlog() {
    if (this.nouveauBlog.titre && this.nouveauBlog.image && this.nouveauBlog.text) {
      const dateAujourdHui = new Date();
      const dateFormatee = moment(dateAujourdHui).format('DD/MM/YYYY');
      this.nouveauBlog.date = dateFormatee;
      this.blogs.push({...this.nouveauBlog});
      localStorage.setItem('blogs', JSON.stringify(this.blogs));
      this.nouveauBlog = {
        titre: '',
        image: '',
        text: '',
        auteur: '',
        date: '',
        id: this.generateNewId()
      };
    } else {
      alert('Veuillez compléter tous les champs');
    }
  }

  generateNewId(): number {
    const maxId = Math.max(...this.blogs.map(blog => blog.id));
    return maxId + 1;
  }
  

  supprimerBlog(id: number) {
    // Trouver l'index du blog avec l'ID spécifié
    const index = this.blogs.findIndex(blog => blog.id === id);
  
    // Si l'ID est trouvé
    if (index !== -1) {
      // Supprimer le blog à l'index trouvé
      this.blogs.splice(index, 1);
  
      // Mettre à jour le localStorage
      localStorage.setItem('blogs', JSON.stringify(this.blogs));
    } else {
      // Afficher un message d'erreur si l'ID n'est pas trouvé
      console.error(`Blog avec l'ID ${id} non trouvé`);
    }
  }
  
/*
  private ajouterExempleBlog() {
    this.blogs.push({
      titulo: 'Silent Hill 2 Remake',
      imagen: './assets/img/silenthill2.jpg',
      texto: 'Nada se vislumbra entre la vaporosa niebla del pueblo maldito. Cuando la oscuridad se cierne sobre sus abandonadas calles, las pesadillas cobran vida y los monstruos acechan como sombras mortíferas. La misma negrura rodea a Silent Hill 2 Remake, el título desarrollado por Bloober Team, creadores de Layers of Fear y The Medium. Ante la falta de información por parte de Konami, el estudio ha salido al paso de los rumores y los ha acallado tan rápido como la espada de Cabeza Piramidal, que cercena cabezas en un abrir y cerrar de ojos. A través de un comunicado publicado en las redes sociales, los desarrolladores se han mostrado orgullosos de formar parte de los planes de la saga: “Junto a nuestro socio, estamos trabajando diligentemente para garantizar que Silent Hill 2 Remake tenga la máxima calidad”, han asegurado. “De parte de nuestro equipo de desarrollo, queremos aclarar que la producción está progresando bien y de acuerdo con nuestro calendario. Comprendemos que muchos jugadores de todo el mundo estén esperando con ganas noticias sobre el juego, apreciamos vuestra dedicación. Sin embargo, os pedimos amablemente que tengáis un poco más de paciencia” Es Konami, como editora del juego, la que compartirá más información. “Nos mostramos confiados de que la espera valdrá la pena”, han añadido.',
      author: 'MeriSation',
      fecha: new Date()
    });
    this.blogs.push({
      titulo: 'Resident Evil 3, análisis:',
      imagen: './assets/img/RESIDENTEVIL3.jpg',
      texto: 'Se repiten las decisiones clave de Capcom de hace más de veinte años: para no tardar demasiado entre uno y otro juego (aquella vez era porque se les echaba encima el lanzamiento de Playstation 2, esta vez... bueno, porque los excelentes resultados del remake de Resident Evil 2 deben haber sido muy tentadores) vuelven escenarios y mecánicas de la anterior entrega. El resultado es un juego potente, con ideas y que sin duda garantiza unas cuantas horas de tensión y suspense. Pero es casi un spin-off, un extra del extraordinario RE2 Remake que un juego con auténtica entidad propia.Pero claro, cómo quejarse: aquí hemos venido a lo que hemos venido, es decir, a una repetición de lo que vimos en el Resident Evil 3 original y allí la cosa ya era derivativa y no demasiado innovadora. Es normal que esas circunstancias se repitan de nuevo, lo que no quiere decir que estemos ante un mal juego: recordemos que Nemesis es uno de los enemigos más icónicos de la saga, Jill Valentine una de sus heroínas más queridas y todo el arranque del juego en una Raccoon City arrasada, aunque recuerde a la segunda entrega, está entre las mejores ubicaciones de la serie. Lo que tenemos es un juego impecable técnicamente, que hace un uso espectacular del motor gráfico y que incluso va más allá del anterior remake en ese sentido, con efectos y escenarios absolutamente impresionantes. También hace un esfuerzo al revisar mecánicas y recursos del anterior juego: se introduce un útil botón de esquiva -que incluso, pulsado en el momento preciso, dispara un curioso efecto bullet-time que convierte cada encuentro con una criatura, casi literalmente, en un minijuego- y hay leves modificaciones en los controles.',
      author: 'Xataka',
      fecha: new Date()
    });
  }
*/
/*
  filtrerBlogs() {
    let blogFiltre = this.blogs;

    if (this.keyWord.trim() !== '') {
      blogFiltre = this.blogs.filter(blog =>
        blog.titre.toLowerCase().includes(this.keyWord.toLowerCase())
      );
    }
    if (this.blogSelectionne) {
      blogFiltre = blogFiltre.filter(blog =>
        blog !== this.blogSelectionne
      );
      blogFiltre.unshift(this.blogSelectionne);
    }

    return blogFiltre;
  }
  */

  /*actualiserSuggestions() {
    this.suggestions = this.blogs
      .map(blog => blog.titre)
      .filter(titre => titre.toLowerCase().includes(this.keyWord.toLowerCase()));
  }

   selectionnerSuggestion(suggestions: string) {
     const blogSelectionne = this.blogs.find(blog => blog.titre === suggestions);

     if (blogSelectionne) {
       this.blogSelectionne = blogSelectionne;
       this.keyWord = '';
     }
  }
  */
}

