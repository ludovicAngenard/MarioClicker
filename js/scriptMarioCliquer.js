//toutes les variables 
var sauter=false;
var score= 0;
var ouvert=false;
var gainGenere=0;
var luigiEstActif=false;
var vieDeBowser=1000;

//class Bonus régit le nombre de bonus, leur prix en fonction du nombre d'achat et leur multiplicateur d'effet
class Bonus 
{
    multiplicateurEffet = 1;
    constructor(prix, nombre) 
    {
        this.prix = prix;
        this.nombre = nombre;
    }
    
    get prixBonus() 
    {
        return this.prix;
    }
    get nombreBonus()
    {
        return this.nombre;
    }
    get effetBonus()
    {
        return this.multiplicateurEffet;
    }
    calculPrixBonus()
    {            
        this.prix*=1.5;
        return this.prix;
    }
    calculNombreEnMoins(){
        this.nombre-=1;
        return this.nombre;
    }
    calculNombreBonus()
    {
        this.nombre+=1;
        return this.nombre;
    }
    calculEffetBonus()
    {
        this.multiplicateurEffet*=2;
        return  this.multiplicateurEffet;
    }

}

//instance de la class Bonus, pieceEtoile multiplie le gain de pièce par deux
var pieceEtoile= new Bonus(100,0);

function multiplicateurDeGain(){
   if (score>=Math.round(pieceEtoile.prixBonus))
   {
        score-=Math.round(pieceEtoile.prixBonus)
        pieceEtoile.calculPrixBonus()
        pieceEtoile.calculNombreBonus()
        pieceEtoile.calculEffetBonus()
   }
   document.getElementById('prixPieceEtoile').textContent='Prix : '+Math.round(pieceEtoile.prixBonus);
   afficheCompteur()
}



//instance de la class Bonus, champignon multiplie les dégats effectués par mario par deux
var champignon= new Bonus(100,0);

function multiplicateurDegat(){
   
   if (score>=Math.round(champignon.prixBonus)){
        score-=Math.round(champignon.prixBonus);
        champignon.calculPrixBonus();
        champignon.calculNombreBonus();
    }
    document.getElementById('prixChampignon').textContent='X : '+Math.round(champignon.prixBonus);
    document.getElementById('inventaireNombreChampignon').textContent='X : '+Math.round(champignon.nombreBonus);
    afficheCompteur()
}

//instance de la class Bonus, luigi est un auto cliqueur qui fait gagner 400 points 
var luigi= new Bonus(200,0);
function achatAutoGain(){
    if ((score>=Math.round(luigi.prixBonus)) && (!luigiEstActif)){
        score-=Math.round(luigi.prixBonus);
        luigi.calculPrixBonus();
        luigi.calculNombreBonus();
        luigiEstActif=true;
        autoGain();
        normal();
       
    }
    document.getElementById('prixLuigi').textContent='X : '+Math.round(luigi.prixBonus);
    afficheCompteur()
}

function autoGain(){
    if(gainGenere<=40)
    {
        document.getElementById('MarioPoids').style.visibility="visible";
        document.getElementById('pieceDessous').style.visibility="hidden";
        setTimeout(ajoutDuGain, 100);
        
    }
    else{
        luigiEstActif=false;
        gainGenere=0;
        document.getElementById('MarioPoids').style.visibility="hidden";
        document.getElementById('pieceDessous').style.visibility="hidden";
    }
    
}
function ajoutDuGain(){
    
    score+=10*luigi.effetBonus
    gainGenere+=1; 
    afficheCompteur()
    document.getElementById('pieceDessous').style.visibility="visible";
    setTimeout(autoGain, 200);
    
    
    
}

// changement de spray quand il saute
function saut()
{
   
    if (!sauter){
        if (luigiEstActif){
            document.getElementById('icon').src='images/LuigiSaut.png';
        }
        else
        {
            document.getElementById('icon').src='images/sticker-mario-saut.jpg.png';
        }
        sauter = !sauter;
        compteur()
        document.getElementById('piece').style.visibility="visible";
        setTimeout(normal, 200);
                     
    }

}
//changement de spray quand il ne saute pas 
function normal()
{
    if (luigiEstActif){
        document.getElementById('icon').src='images/Luigi.png';
    }
    else{
        document.getElementById('icon').src='images/MarioNSMBUDeluxe.png';
    }
    
    document.getElementById('piece').style.visibility="hidden";
    sauter=false;

}
//ajoute + 1 au compteur de pièces et l'affiche ensuite
function compteur(){
    score += 1 * pieceEtoile.effetBonus;
    
    afficheCompteur()
}
//affiche le nombre de pièce
function afficheCompteur(){
    document.getElementById('compteurChiffre').textContent="X "+score;
}

//quand la boite mystère est cliquée, un onglet apparait sur la gauche avec le nomre de bonus pret pour le combat
function apparitionSac(){
    if (!ouvert){
        document.getElementById('sac').style.visibility='visible';
        ouvert=!ouvert;
    }
    else{
        document.getElementById('sac').style.visibility='hidden';
        ouvert=!ouvert;
    }

}
//quand l'icone bowser  est cliquée,  le html change pour laisser place au combat 
function combat()
    {
        document.getElementById('contientMarioEtPiece').style.display='none';
        document.getElementById('boutique').style.display='none';
        document.getElementById('ContientCombat').style.display='block';
        document.getElementById('bonusCombat').style.display='block';
        document.getElementById('NombreChampignon').textContent=champignon.nombreBonus+' X ';
        
    }
//quand on clique sur bowser ça lui enlève des points de vies et quand il meurt ça affiche l'html d'avant 
function cliqueContreBowser(){
    if (vieDeBowser>0){
        vieDeBowser-=1*champignon.effetBonus;
        document.getElementById('bowserVieIndicateur').textContent=vieDeBowser+' X ';
      
    }
    else{
        document.getElementById('boutique').style.display='block';
        document.getElementById('contientMarioEtPiece').style.display='block';
        document.getElementById('ContientCombat').style.display='none';
        document.getElementById('bonusCombat').style.display='none';
        

    }
    
}
// quand l'utilisateur clique sur le petit champignon en combat ça active le bonus qui double les dégats de marios
function bonusDeDegats(){
    if(champignon.nombreBonus>0){ 
        champignon.calculNombreEnMoins();
        champignon.calculEffetBonus();
        document.getElementById('inventaireNombreChampignon').textContent='X : '+Math.round(champignon.nombreBonus);
        document.getElementById('NombreChampignon').textContent=Math.round(champignon.nombreBonus)+' X ';
        
    }
 
}


    
