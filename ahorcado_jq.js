class Juego {

    constructor() {
        this._palabras = ["m u l t i m e d i a", "i n t e r n a u t a", "s e r v i d o r", "p r o t o c o l o", "c o r t a f u e g o s",
            "n a v e g a d o r", "n o d o", "m a r c o", "p a g i n a", "t e l a r a ñ a",
            "d e s c a r g a r", "v i r t u a l", "m e m o r i a", "d i s c o", "l o c a l",
            "c o n e c t a r", "d e s c o n e c t a r", "e n c a m i n a d o r", "i n t e r n e t", "d o m i n i o",
            "d i n a m i c o", "h i p e r v i n c u l o", "e n l a c e", "m a r c a d o r", "o r d e n a d o r", "l a p i z", "o f i m a t i c a", "i n f o r m e"
        ]; //lista de palabras a adivinar
        this._letrasUsadas = [];
        this._palabraEscogida = [];
        this._partes = 0;
        this._colNueva = 0;
        this._jugando;
        this._hombre = ["___\n", "   |\n", "   O\n", "  /", "|", "\\\n", "  /", " \\\n", "___"];
        this._esta = false;
    }
    get palabras() {
        return this._palabras;
    }
    set palabras(x) {
        this._palabras = x;
    }
    get letrasUsadas() {
        return this._letrasUsadas;
    }
    set letrasUsadas(x) {
        this._letrasUsadas = x;
    }
    get palabraEscogida() {
        return this._palabraEscogida;
    }
    set palabraEscogida(x) {
        this._palabraEscogida = x;
    }
    get partes() {
        return this._partes;
    }
    set partes(x) {
        this._partes = x;
    }
    get colNueva() {
        return this._colNueva;
    }
    set colNueva(x) {
        this._colNueva = x;
    }
    get jugando() {
        return this._jugando;
    }
    set jugando(x) {
        this._jugando = x;
    }
    get hombre() {
        return this._hombre;
    }
    set hombre(x) {
        this._hombre = x;
    }
    get esta() {
        return this._esta;
    }
    set esta(x) {
        this._esta = x;
    }
    ObtienePalabra() {
        //obtiene la palabra para jugar de forma pseudoaleatoria
        var indice = Math.round(Math.random() * 27);
        var cadena = new String(this._palabras[indice]);
        this._palabraEscogida = cadena.split(" ");
    }
    DibujaHombre(visor, partes) {
        //dibuja el hombre ahorcado
        //partes indica el numero de partes a dibujar
        var dibujo = "";
        if (this._partes < 10)
            for (let x = 0; x < this._partes; x++) {
                dibujo += this._hombre[x];
            }
        visor.displayHombre.value = dibujo;
    }

    DibujaLetra(visor, letra) {
        //dibuja una letra de la palabra
        //posicion indica donde debe dibujar la letra
        var flag = false;
            //indica si se encontro la letra 
            //obtiene cadena actual
        var cadena = new String(visor.displayPalabra.value);
            //la separa en sus espacios
        var letrasCadena = cadena.split(" ");
        cadena = "";
        for (let x = 0; x < this._palabraEscogida.length; x++) {
            if (this.palabraEscogida[x] == letra) {
                cadena += letra + " ";
                flag = true;
            } else
                cadena += letrasCadena[x] + " ";
        }
        visor.displayPalabra.value = cadena;
        return flag;
    }
    NuevaLetra(visor, letra) {
        //a�ade letra lista de letras
        if (!this._letrasUsadas.includes(letra)) {
            this._esta = true;
            visor.displayLetras.value += letra + " ";
            this._letrasUsadas.push(letra);
            //comprueba si ha de pasar a la siguiente fila
            if (this._colNueva == 3) {
                visor.displayLetras.value += "\n";
                this._colNueva = 0;
            } else
                this._colNueva++;
        } else {
            this._esta = false;

        }
    }
    Juega(letra) {
        //comprueba si esta jugando
        var visor2=document.getElementById("formulario");
        if (this._jugando) {
            //ciclo de jugada
            //1. añade letra a la lista
            this.NuevaLetra(visor2, letra)
                //2. dibuja la letra y comprueba si acierto
            var acierto = this.DibujaLetra(visor2, letra)
                //3. si no acierto, dibuja hombre
            if (!acierto) {
                if (this._esta) {

                    this.DibujaHombre(visor2, ++this._partes)
                }
                //4. comprueba si fin
            }
            if (this._partes == 9)
                this.FinJuego(false);
            else if (this.CompruebaPalabra(visor2))
                this.FinJuego(true);
        } else {
            console.log(jugando);
            alert('Pulsa Juego nuevo para comenzar\nuna partida nueva.')
        }
    }
    IniciaJuego(visor) {
        //inicializa visor y variables globales
        this._jugando = true;
        this._partes = 0;
        this._colNueva = 0;
        this.ObtienePalabra()
        this.DibujaHombre(visor, this._partes)
        visor.displayPalabra.value = "";
        for (let x = 0; x < this._palabraEscogida.length; x++)
            visor.displayPalabra.value += "_ ";
        visor.displayLetras.value = "";
    }
    CompruebaPalabra(visor) {
        //comprueba si se completo toda la palabra
        var fin = true;
        //obtiene cadena actual
        var cadena = new String(visor.displayPalabra.value);
        //la separa en sus espacios
        var letrasCadena = cadena.split(" ");
        for (let x = 0; x < letrasCadena.length; x++)
            if (letrasCadena[x] == "_")
                fin = false;
        return fin;
    }
    FinJuego(resultado) {
        //indica que si se ha perdido o ganado
        var solucion = "";
        this._jugando = false;
        if (resultado) {
            document.visor.ganadas.value++;
            alert("Acertaste !");
        } else {
            document.visor.perdidas.value++;
            //construye la palabra solucion
            for (let x = 0; x < this._palabraEscogida.length; x++)
                solucion += this._palabraEscogida[x];
            alert("Has muerto !\n La palabra era: " + solucion);
        }
    }


}
class Jugador {
    constructor(identidad) {
        this._nombre = identidad;
        this._puntuacion = 90;
        this._fallos = 0;
        this._aciertos = 0;
    }
    get nombre() /*los nombres de la clase y el atributo no puede coincidir entonces el atributo intienero se le pone un guion en modo estandar*/ {
        return this._nombre;
    }
    set nombre(x) {
        this._nombre = x;
    }
    get puntuacion() {
        return this._puntuacion;
    }
    set puntuacion(x) {
        this._puntuacion = x;
    }
    get fallos() {
        return this._fallos;
    }
    set fallos(x) {
        this._fallos = x;
    }
    get aciertos() {
        return this._aciertos;
    }
    set aciertos(x) {
        this._aciertos = x;
    }

    apuntarFallo() {
        if (this.puntuacion >= 10) /* this.puntuacion=this.puntuacion-10; */
            this.puntuacion -= 10;
    }

}

var marcador = 0;

function Iniciar() {
    var visor2=document.getElementById("formulario");
    juego_actual = new Juego();
    juego_actual.IniciaJuego(visor2);
    marcador = 1;
    //console.log(marcador);
}


function Jugar(visor2, letra) {
    console.log(visor2);
    console.log(letra);

    if (visor2 == undefined && letra == undefined && marcador == 0) {
        alert('Pulsa Juego nuevo para comenzar\nuna partida nueva.');
    } else {
        juego_actual.Juega(visor2, letra);
    }

}
$(document).ready(function() {

    $(".boton").click(function() {
        var visor2=document.getElementById("formulario");
        letra = ($(this).val());
       // alert("prueba" + letra);
        
        //Jugar(visor2, letra);

    });

});
/*  var jugadorActual = new Jugador(prompt("Identificate"));

  jugadorActual.apuntarFallo();
  alert(jugadorActual.nombre + "tiene una puntuacion de:" + jugadorActual.puntuacion);*/