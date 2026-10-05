export type CourseLesson = {
  slug: string;
  title: string;
  summary: string;
  group: string;
  optionalPdf?: string;
  resources: {
    title: string;
    description: string;
    source: string;
    url: string;
  }[];
  sections: {
    title: string;
    paragraphs: string[];
    code?: string;
    codeExplanation?: string;
    note?: string;
  }[];
  exercise: string;
  exerciseHints?: string[];
  quiz?: {
    question: string;
    options: string[];
    answerIndex: number;
    explanation: string;
  };
};

export const lessons: CourseLesson[] = [
  {
    slug: "unix-terminal",
    title: "Unix et terminal",
    summary: "Se repérer dans les fichiers et utiliser les commandes indispensables.",
    group: "Premiers pas",
    resources: [
      {
        title: "Bash Reference Manual",
        description: "Documentation de référence pour le shell Bash.",
        source: "GNU",
        url: "https://www.gnu.org/software/bash/manual/bash.html",
      },
    ],
    sections: [
      {
        title: "Se déplacer dans l’arborescence",
        paragraphs: [
          "Le shell lit les commandes que tu saisis et lance les programmes correspondants. Le prompt attend une commande ; après validation, le shell affiche la sortie puis un nouveau prompt.",
          "pwd (print working directory) affiche le chemin du dossier courant. ls liste les fichiers ; avec -la, il affiche aussi les fichiers cachés et les détails comme les permissions. cd change de dossier.",
          "Un chemin relatif est interprété depuis le dossier courant. Un chemin absolu commence à la racine /. Le point . désigne le dossier courant et .. son parent. Le tilde ~ représente le dossier personnel.",
          "Les noms de fichiers Unix distinguent les majuscules des minuscules. Les espaces doivent être protégés ou entourés de guillemets, par exemple cd \"Mon dossier\".",
        ],
        code: `pwd
ls -la
cd piscine-c
cd ..`,
        codeExplanation: "Exécute les commandes l’une après l’autre : tu affiches d’abord où tu te trouves, listes le contenu avec les détails, entres dans piscine-c, puis remontes d’un niveau.",
      },
      {
        title: "Créer et manipuler des fichiers",
        paragraphs: [
          "mkdir crée un dossier, touch crée un fichier vide et mv déplace ou renomme. cp copie ; cat affiche le contenu d’un fichier texte dans le terminal.",
          "rm supprime un fichier sans le placer dans une corbeille. Vérifie soigneusement le chemin avant de l’utiliser. Pour supprimer un dossier vide, rmdir est plus prudent.",
          "Les options modifient le comportement d’une commande. Le manuel man ls décrit ls ; q quitte généralement le manuel. La commande file peut identifier le type d’un fichier.",
        ],
        code: `mkdir jour01
touch jour01/main.c
mv jour01/main.c jour01/hello.c
cat jour01/hello.c`,
        codeExplanation: "On crée le dossier avant d’y créer un fichier. mv renomme ici main.c en hello.c dans le même dossier ; cat ne montrera rien tant que le fichier est vide.",
        note: "Une commande s’exécute dans le dossier courant. Les messages d’erreur et le code de sortie donnent des indices : 0 signifie généralement succès, une valeur non nulle signale un problème.",
      },
    ],
    exercise: "Crée un dossier jour00, ajoute-y main.c, puis affiche son chemin absolu.",
  },
  {
    slug: "compilation",
    title: "Compiler et déboguer",
    summary: "Comprendre les étapes de compilation et interpréter les erreurs.",
    group: "Premiers pas",
    resources: [
      {
        title: "Warning Options",
        description: "Détail des options d’avertissement de GCC.",
        source: "GNU GCC",
        url: "https://gcc.gnu.org/onlinedocs/gcc/Warning-Options.html",
      },
      {
        title: "C Programming Language",
        description: "Parcours général pour consolider les bases du langage.",
        source: "GeeksforGeeks",
        url: "https://www.geeksforgeeks.org/c/c-programming-language/",
      },
    ],
    sections: [
      {
        title: "Du source à l’exécutable",
        paragraphs: [
          "Le compilateur traduit le code source en programme exécutable. Le préprocesseur traite notamment les directives #include ; le compilateur traduit le C en assembleur, l’assembleur produit des fichiers objets, puis l’éditeur de liens construit l’exécutable.",
          "GCC réalise ces étapes pour toi. L’option -o donne le nom de l’exécutable ; sans elle, GCC choisit habituellement a.out. Lancer le compilateur et lancer le programme sont deux actions distinctes.",
          "Pendant les exercices, active les avertissements : ils signalent souvent des erreurs avant même l’exécution. Corrige-les plutôt que de les masquer, car un programme qui compile n’est pas forcément correct.",
        ],
        code: `gcc -Wall -Wextra -Werror main.c -o programme
./programme`,
        codeExplanation: "-Wall et -Wextra demandent des avertissements supplémentaires, -Werror les transforme en erreurs. La seconde ligne lance l’exécutable créé dans le dossier courant.",
      },
      {
        title: "Lire une erreur",
        paragraphs: [
          "Un message de compilation indique généralement le fichier, la ligne et la nature du problème. Commence par la première erreur : une accolade oubliée peut produire plusieurs messages secondaires.",
          "Une erreur de syntaxe est détectée pendant la compilation. Une erreur de lien (« undefined reference ») signifie souvent qu’une fonction est déclarée mais que sa définition ou une bibliothèque manque.",
          "Un avertissement n’empêche pas nécessairement la création de l’exécutable. Lis-le tout de même : conversion de type inattendue, variable inutilisée ou format printf incorrect peuvent signaler de vrais défauts.",
        ],
        code: `gcc -Wall -Wextra -Werror -std=c99 main.c -o programme`,
        codeExplanation: "-std=c99 choisit le standard C99. Pour plusieurs fichiers, indique chacun d’eux dans la commande, par exemple main.c utils.c ; chaque fichier source doit être compilé et lié.",
        note: "-Wall et -Wextra activent des avertissements utiles ; -Werror les traite comme des erreurs pour garder un code propre.",
      },
    ],
    exercise: "Compile un programme avec -Wall -Wextra -Werror, provoque volontairement une erreur de syntaxe, puis corrige-la.",
  },
  {
    slug: "premier-programme",
    title: "Structure d’un programme C",
    summary: "Écrire main, inclure un en-tête et afficher un premier message.",
    group: "Bases du C",
    resources: [
      {
        title: "C Programming Language",
        description: "Introduction et index des notions fondamentales en C.",
        source: "GeeksforGeeks",
        url: "https://www.geeksforgeeks.org/c/c-programming-language/",
      },
    ],
    sections: [
      {
        title: "Le point d’entrée main",
        paragraphs: [
          "Un programme C autonome commence son exécution dans main. int annonce que la fonction renvoie un entier ; void dans la parenthèse signifie qu’elle ne reçoit aucun argument.",
          "La valeur retournée par main indique au système si le programme s’est terminé correctement : 0 signifie succès ; une valeur non nulle signale habituellement une erreur.",
          "Un fichier d’en-tête expose des déclarations. stdio.h donne accès à printf ; la directive #include demande au préprocesseur d’insérer les déclarations nécessaires avant la compilation.",
          "Une fonction est constituée d’un type de retour, d’un nom, de paramètres entre parenthèses et d’un corps entre accolades. Le programme exécute les instructions de main dans l’ordre.",
        ],
        code: `#include <stdio.h>

int main(void)
{
    printf("Bonjour, Piscine !\\n");
    return 0;
}`,
        codeExplanation: "stdio.h déclare printf. L’appel affiche le texte entre guillemets ; \\n provoque un retour à la ligne. return 0 termine main et indique une exécution réussie.",
      },
      {
        title: "Instructions et formatage",
        paragraphs: [
          "Une instruction simple se termine par un point-virgule. Les accolades délimitent un bloc, par exemple le corps d’une fonction ou d’une condition. L’indentation n’est pas imposée au compilateur, mais elle est essentielle à la relecture.",
          "printf écrit sur la sortie standard. Les marqueurs de format comme %d sont remplacés par les arguments qui suivent la chaîne. Le nombre, l’ordre et les types de ces arguments doivent correspondre.",
          "%d affiche un int, %c un caractère, %s une chaîne, %f un double dans printf et %zu une valeur size_t. %.2f demande deux chiffres après le séparateur décimal.",
          "Une chaîne littérale utilise des guillemets doubles ; un caractère isolé utilise des apostrophes. \\n est une séquence spéciale qui représente un saut de ligne.",
        ],
        code: `int age = 18;
printf("Age : %d\\n", age);`,
        codeExplanation: "age reçoit la valeur 18. Dans printf, %d est remplacé par age ; \\n place ensuite le curseur sur la ligne suivante.",
        note: "Les arguments variadiques de printf ne sont pas vérifiés par le langage C à l’exécution. Un mauvais format peut causer un comportement indéfini.",
      },
    ],
    exercise: "Écris un programme qui affiche ton prénom et le nom de ta fonction main, chacun sur sa propre ligne.",
  },
  {
    slug: "types-variables",
    title: "Types et variables",
    summary: "Déclarer des valeurs, choisir leur type et les afficher.",
    group: "Bases du C",
    resources: [
      {
        title: "C Programming Language",
        description: "Parcours de référence pour les bases et les types du C.",
        source: "GeeksforGeeks",
        url: "https://www.geeksforgeeks.org/c/c-programming-language/",
      },
    ],
    sections: [
      {
        title: "Déclarer une variable",
        paragraphs: [
          "Une variable associe un nom à un objet stocké en mémoire. Sa déclaration précise son type, qui détermine les valeurs représentables, la taille de l’objet et les opérations autorisées.",
          "int représente les entiers ; char sert aux caractères et aux octets ; float et double représentent des nombres à virgule flottante, avec une précision différente. Les tailles exactes dépendent de l’implémentation, à l’exception des garanties données par le standard.",
          "Initialise une variable avant de la lire. Une variable locale automatique non initialisée a une valeur indéterminée ; la lire peut entraîner un comportement indéfini.",
          "Les identifiants sont sensibles à la casse et ne peuvent pas commencer par un chiffre. Choisis un nom explicite et déclare une variable au plus près de son utilisation.",
        ],
        code: `int tentatives = 3;
char niveau = 'A';
double moyenne = 14.75;

printf("%d %c %.2f\\n", tentatives, niveau, moyenne);`,
        codeExplanation: "Les déclarations associent un nom et un type à chaque valeur. %.2f affiche moyenne avec deux décimales ; chaque argument doit correspondre au marqueur de même position.",
      },
      {
        title: "Conversions et limites",
        paragraphs: [
          "Une conversion entre types peut perdre de l’information. Convertir un double vers int tronque la partie fractionnaire vers zéro ; convertir un entier trop grand vers un type plus petit peut perdre de l’information.",
          "Les opérations entre entiers restent entières : 5 / 2 vaut 2, car la division entière élimine le reste. Pour obtenir 2,5, au moins un opérande doit être un nombre à virgule flottante.",
          "Les entiers signés ont des limites définies par leur type ; dépasser la capacité d’un entier signé est un comportement indéfini. Les types non signés suivent une arithmétique modulo leur plage.",
          "Choisis un type qui représente les valeurs attendues et vérifie le spécificateur de format de printf. Les conversions implicites existent, mais les rendre explicites rend souvent l’intention plus claire.",
        ],
        code: `int quotient = 5 / 2;
double precise = 5.0 / 2.0;
printf("%d %.1f\\n", quotient, precise);`,
        codeExplanation: "quotient vaut 2 parce que les deux opérandes sont des int. Dans la seconde expression, 5.0 et 2.0 sont des constantes flottantes : precise vaut 2,5.",
        note: "Les variables de même type peuvent être déclarées séparément : c’est souvent plus lisible et cela facilite le débogage.",
      },
    ],
    exercise: "Déclare un entier, un caractère et un double, puis affiche leurs valeurs avec les bons formats.",
  },
  {
    slug: "operateurs-conditions",
    title: "Opérateurs et conditions",
    summary: "Construire des expressions et choisir un chemin d’exécution.",
    group: "Bases du C",
    resources: [
      {
        title: "C Programming Language",
        description: "Retrouve les opérateurs et structures de contrôle dans ce guide.",
        source: "GeeksforGeeks",
        url: "https://www.geeksforgeeks.org/c/c-programming-language/",
      },
    ],
    sections: [
      {
        title: "Comparer des valeurs",
        paragraphs: [
          "Les opérateurs ==, !=, <, <=, > et >= comparent des valeurs. Une comparaison produit un résultat faux (0) ou vrai (1). Attention à ne pas confondre == (comparaison) et = (affectation).",
          "Les opérateurs logiques && (et), || (ou) et ! (non) combinent ou inversent des conditions. && et || évaluent de gauche à droite avec court-circuit : le second opérande peut ne pas être évalué.",
          "Les parenthèses rendent les expressions complexes plus faciles à comprendre. N’écris pas de tests entremêlant affectations et comparaisons si une forme plus explicite est possible.",
          "Le bloc if est exécuté quand la condition est vraie ; else donne le chemin alternatif. Les accolades évitent les erreurs quand on ajoute ensuite une instruction.",
        ],
        code: `int score = 72;

if (score >= 50) {
    printf("Module valide\\n");
} else {
    printf("Module a retravailler\\n");
}`,
        codeExplanation: "score >= 50 est vrai pour score égal à 72, donc le premier bloc s’exécute. Avec score inférieur à 50, c’est le bloc else qui s’exécute.",
      },
      {
        title: "Choisir entre plusieurs cas",
        paragraphs: [
          "if / else if / else exprime des choix selon des conditions testées dans l’ordre. Dès qu’une condition est vraie, son bloc s’exécute et les autres branches sont ignorées.",
          "switch compare une expression entière ou un caractère à des valeurs constantes case. Le bloc default traite les valeurs qui ne correspondent à aucun cas.",
          "Dans un switch, break termine le cas courant. Sans break, l’exécution continue dans le cas suivant : c’est la chute volontaire ou accidentelle (fall-through).",
          "switch n’est pas adapté à des intervalles comme « entre 10 et 20 » ; utilise des conditions if / else if pour ce type de comparaison.",
        ],
        code: `char option = 'b';

switch (option) {
case 'a':
    printf("Option A\\n");
    break;
case 'b':
    printf("Option B\\n");
    break;
default:
    printf("Option inconnue\\n");
}`,
        codeExplanation: "Pour option == 'b', l’exécution affiche « Option B », puis break quitte le switch. Si aucune étiquette ne correspond, default s’exécute.",
      },
    ],
    exercise: "À partir d’une variable temperature, affiche « froid », « doux » ou « chaud » selon trois intervalles.",
  },
  {
    slug: "boucles",
    title: "Boucles et répétitions",
    summary: "Répéter des instructions avec for, while et do-while.",
    group: "Bases du C",
    resources: [
      {
        title: "Loops in C",
        description: "Comparaison des boucles for, while et do-while.",
        source: "GeeksforGeeks",
        url: "https://www.geeksforgeeks.org/c/c-loops/",
      },
    ],
    sections: [
      {
        title: "La boucle for",
        paragraphs: [
          "for rassemble trois expressions : l’initialisation s’exécute une fois, la condition est testée avant chaque tour et l’expression d’évolution s’exécute après chaque tour.",
          "Pour compter de 0 à n exclu, la condition habituelle est i < n. Cela correspond naturellement aux indices de tableau, qui commencent à 0 et se terminent à n - 1.",
          "Si la condition est fausse dès le début, le corps de for ne s’exécute jamais. Pour parcourir une collection, assure-toi que l’évolution rapproche bien le compteur de la fin.",
          "Le compteur déclaré dans l’initialisation est limité au bloc de la boucle en C99 et standards suivants ; il n’est plus accessible après l’accolade fermante.",
        ],
        code: `for (int i = 0; i < 5; i++) {
    printf("%d\\n", i);
}`,
        codeExplanation: "i commence à 0 ; tant que i < 5, le corps affiche i. Après chaque affichage, i++ augmente la valeur de 1. La boucle affiche donc 0, 1, 2, 3 et 4.",
      },
      {
        title: "while et do-while",
        paragraphs: [
          "while teste la condition avant chaque tour et peut ne jamais entrer dans la boucle. do-while exécute le corps au moins une fois, puis teste la condition à la fin ; il faut un point-virgule après while (condition).",
          "Une boucle doit faire évoluer un état qui permet de sortir. Sans cela, elle peut ne jamais terminer. Une boucle infinie est parfois voulue pour un serveur, mais doit alors avoir une sortie ou un arrêt contrôlé.",
          "Choisis for quand initialisation, test et progression sont liés ; choisis while lorsque la fin dépend d’un événement ou d’une condition extérieure.",
        ],
        code: `int count = 3;
while (count > 0) {
    printf("%d\\n", count);
    count--;
}`,
        codeExplanation: "count vaut 3 au départ. Après chaque affichage, count-- le diminue. Lorsque count atteint 0, count > 0 devient faux et la boucle s’arrête.",
        note: "break quitte la boucle immédiatement ; continue passe directement au tour suivant. Utilise-les avec parcimonie.",
      },
    ],
    exercise: "Calcule et affiche la somme des entiers de 1 à 100 avec une boucle.",
  },
  {
    slug: "fonctions",
    title: "Fonctions et portée",
    summary: "Découper un problème, passer des paramètres et retourner un résultat.",
    group: "Bases du C",
    resources: [
      {
        title: "Functions in C",
        description: "Fonctions, paramètres, prototypes et valeurs de retour.",
        source: "GeeksforGeeks",
        url: "https://www.geeksforgeeks.org/c/c-functions/",
      },
    ],
    sections: [
      {
        title: "Définir et appeler une fonction",
        paragraphs: [
          "Une fonction nommée reçoit zéro ou plusieurs paramètres et renvoie une valeur du type annoncé avant son nom. Une fonction déclarée void ne renvoie pas de valeur.",
          "Les paramètres sont passés par valeur : la fonction reçoit une copie. Modifier left à l’intérieur de add ne modifierait donc pas la variable fournie par l’appelant.",
          "Une fonction aide à isoler une responsabilité, nommer une opération et réutiliser une logique. Des fonctions courtes facilitent les tests et la recherche d’erreurs.",
          "return termine immédiatement la fonction. Dans une fonction non void, chaque chemin d’exécution doit renvoyer une valeur du type annoncé.",
        ],
        code: `int add(int left, int right)
{
    return left + right;
}

int result = add(4, 7);
printf("%d\\n", result);`,
        codeExplanation: "add reçoit les valeurs 4 et 7, calcule leur somme et la renvoie. L’appelant stocke cette valeur dans result puis l’affiche.",
      },
      {
        title: "Prototypes et portée",
        paragraphs: [
          "Un prototype annonce la signature d’une fonction avant son utilisation. Il comporte le type de retour, le nom et les types des paramètres, et se termine par un point-virgule.",
          "Il se place souvent dans un fichier .h, tandis que la définition se trouve dans un fichier .c. L’éditeur de liens relie ensuite les fichiers objets correspondants.",
          "Une variable locale n’existe que dans le bloc où elle est déclarée. Une variable de bloc masque une variable du même nom dans un bloc extérieur ; évite ces ambiguïtés.",
          "Les variables globales ont une durée de vie longue et sont accessibles de nombreux endroits. Leur utilisation implicite rend le programme plus difficile à comprendre et à tester.",
        ],
        code: `int add(int left, int right); /* prototype */

int main(void)
{
    printf("%d\\n", add(2, 3));
    return 0;
}`,
        codeExplanation: "Le prototype permet à main d’appeler add avant sa définition. Dans un vrai programme, la définition de add doit être compilée et liée avec ce fichier.",
      },
    ],
    exercise: "Écris une fonction qui reçoit deux entiers et renvoie le plus grand, puis teste-la depuis main.",
  },
  {
    slug: "tableaux-chaines",
    title: "Tableaux et chaînes",
    summary: "Parcourir des séquences et manipuler les chaînes terminées par zéro.",
    group: "Données et mémoire",
    resources: [
      {
        title: "Arrays in C",
        description: "Déclaration, initialisation et parcours de tableaux.",
        source: "GeeksforGeeks",
        url: "https://www.geeksforgeeks.org/c/c-arrays/",
      },
      {
        title: "C Programming Language",
        description: "Retrouve aussi les notions de chaînes et de tableaux.",
        source: "GeeksforGeeks",
        url: "https://www.geeksforgeeks.org/c/c-programming-language/",
      },
    ],
    sections: [
      {
        title: "Tableaux",
        paragraphs: [
          "Un tableau stocke une suite contiguë d’éléments du même type. Son premier indice est 0 ; un tableau de taille n a donc des indices valides de 0 à n - 1.",
          "C ne vérifie pas automatiquement qu’un indice reste dans les limites. Un accès hors tableau entraîne un comportement indéfini : résultat erroné, corruption mémoire ou plantage.",
          "La longueur n’est pas stockée avec le tableau de manière automatiquement récupérable. Conserve et transmets la taille, idéalement avec le tableau dans une structure si les deux vont ensemble.",
          "Quand un tableau est passé à une fonction, il est généralement converti en pointeur vers son premier élément. sizeof sur ce paramètre donne alors la taille du pointeur, pas celle du tableau d’origine.",
        ],
        code: `int values[] = {12, 16, 14};
int size = 3;
int sum = 0;

for (int i = 0; i < size; i++) {
    sum += values[i];
}
printf("Somme : %d\\n", sum);`,
        codeExplanation: "values contient trois entiers. La boucle parcourt les indices 0, 1 et 2 et ajoute chaque élément à sum ; la somme affichée est 42.",
      },
      {
        title: "Chaînes de caractères",
        paragraphs: [
          "Une chaîne C est un tableau de char terminé par le caractère nul '\\0'. Ce terminateur marque la fin du texte ; il faut donc réserver une case de plus que le nombre de caractères visibles.",
          "La chaîne littérale \"Epitech\" contient 7 caractères visibles et un terminateur. La fonction strlen compte les caractères avant '\\0', sans compter le terminateur.",
          "Les fonctions de manipulation des chaînes se trouvent dans string.h. Elles attendent des chaînes terminées correctement ; leur fournir un buffer non terminé peut provoquer une lecture hors limites.",
          "Avant d’écrire dans un buffer, vérifie sa capacité. Prévois de la place pour le terminateur et n’utilise pas strcpy ou strcat sans garantir que la destination est assez grande.",
        ],
        code: `#include <stdio.h>
#include <string.h>

int main(void)
{
    char name[] = "Epitech";
    printf("%zu caracteres\\n", strlen(name));
    return 0;
}`,
        codeExplanation: "name est un tableau modifiable contenant les caractères de la chaîne et son terminateur. strlen renvoie une valeur de type size_t, affichée ici avec %zu.",
        note: "Un tableau transmis à une fonction ne transporte pas sa taille automatiquement : passe la longueur séparément. Pour une chaîne littérale qui ne doit pas être modifiée, utilise const char *.",
      },
    ],
    exercise: "Écris une fonction qui compte le nombre de voyelles d’une chaîne sans dépasser son caractère nul.",
  },
  {
    slug: "pointeurs",
    title: "Pointeurs et adresses",
    summary: "Comprendre les adresses mémoire, la déréférence et le lien avec les tableaux.",
    group: "Données et mémoire",
    resources: [
      {
        title: "Pointers in C",
        description: "Adresses, initialisation et déréférencement.",
        source: "GeeksforGeeks",
        url: "https://www.geeksforgeeks.org/c/c-pointers/",
      },
    ],
    sections: [
      {
        title: "Adresse et déréférence",
        paragraphs: [
          "Un pointeur est une variable qui peut contenir l’adresse d’un objet. &x obtient l’adresse de x ; *pointer est l’opérateur de déréférencement qui accède à l’objet pointé.",
          "Le type du pointeur précise le type de l’objet pointé : int * désigne un int. Le type permet au compilateur de savoir combien d’octets lire et comment interpréter l’objet.",
          "Déclare un pointeur avec son type, par exemple int *pointer. Les espaces autour de * ne changent pas le sens ; une convention cohérente évite les confusions avec la multiplication.",
          "Un pointeur doit désigner un objet vivant et correctement aligné avant d’être déréférencé. Un pointeur non initialisé ou une adresse invalide ne doit jamais être utilisé.",
        ],
        code: `int score = 42;
int *address = &score;

printf("%d\\n", *address);
*address = 50;
printf("%d\\n", score);`,
        codeExplanation: "address reçoit l’adresse de score. *address lit d’abord 42 ; l’affectation *address = 50 modifie score lui-même, ce que montre le second printf.",
      },
      {
        title: "Modifier une valeur dans une fonction",
        paragraphs: [
          "Comme les arguments sont copiés, une fonction qui doit modifier une variable de l’appelant reçoit un pointeur vers cette variable. L’appelant fournit alors l’adresse avec &variable.",
          "Un pointeur nul ne désigne aucun objet. Compare-le à NULL avant de le déréférencer lorsque la fonction peut recevoir une adresse facultative.",
          "Le type de retour void signifie que la fonction ne renvoie pas de résultat. Elle agit ici sur l’objet désigné par value.",
          "Une fonction peut recevoir plusieurs pointeurs de sortie. Documente clairement lesquels doivent être non nuls et quelles valeurs la fonction modifie.",
        ],
        code: `void set_to_zero(int *value)
{
    if (value != NULL) {
        *value = 0;
    }
}`,
        codeExplanation: "Si value n’est pas NULL, *value désigne l’entier de l’appelant et l’affecte à zéro. L’appel doit ressembler à set_to_zero(&score).",
        note: "Les pointeurs et les tableaux sont liés en C, mais ils ne sont pas identiques : un tableau a une taille fixe, un pointeur est une variable d’adresse.",
      },
    ],
    exercise: "Écris une fonction swap qui échange deux entiers en recevant leurs adresses.",
  },
  {
    slug: "argc-argv",
    title: "Arguments du programme",
    summary: "Lire argc et argv pour créer des programmes pilotés depuis le terminal.",
    group: "Données et mémoire",
    resources: [
      {
        title: "C Programming Language",
        description: "Guide général pour compléter la lecture sur les arguments de main.",
        source: "GeeksforGeeks",
        url: "https://www.geeksforgeeks.org/c/c-programming-language/",
      },
    ],
    sections: [
      {
        title: "La signature de main",
        paragraphs: [
          "La forme int main(int argc, char *argv[]) donne accès aux arguments transmis au lancement. argc est le nombre d’arguments ; argv est un tableau de chaînes accessibles par indice.",
          "argv[0] contient généralement le nom utilisé pour lancer le programme. Si argc vaut 1, seul argv[0] est présent : aucun argument utilisateur n’a été fourni.",
          "Les arguments restent du texte, même s’ils représentent un nombre. argv[1] désigne le premier argument fourni par l’utilisateur, à condition que argc soit supérieur à 1.",
          "La norme C garantit aussi une forme de main sans paramètres : int main(void). Les deux formes présentées sont les signatures usuelles des programmes exécutés depuis le terminal.",
        ],
        code: `#include <stdio.h>

int main(int argc, char *argv[])
{
    for (int i = 0; i < argc; i++) {
        printf("argv[%d] = %s\\n", i, argv[i]);
    }
    return 0;
}`,
        codeExplanation: "La boucle commence à 0 et s’arrête avant argc, donc elle lit chaque argument valide. Le format %s affiche chaque chaîne ; argv[argc] est un pointeur nul, pas un argument à afficher.",
      },
      {
        title: "Valider les entrées",
        paragraphs: [
          "Vérifie le nombre et le format des arguments avant de les utiliser. Ici, argc doit valoir 2 : le nom du programme plus un argument utilisateur.",
          "Ne suppose pas que l’utilisateur suit le cas nominal. Un message d’usage clair rend le programme plus simple à tester. Les diagnostics s’écrivent sur stderr afin de ne pas les confondre avec la sortie normale.",
          "Pour convertir un texte en entier, strtol permet de détecter l’absence de chiffres, les caractères supplémentaires et les dépassements de capacité. atoi ne permet pas de distinguer correctement plusieurs erreurs.",
          "Ne lis argv[1] qu’après avoir vérifié argc. Un indice invalide dans argv peut provoquer un accès mémoire incorrect.",
        ],
        code: `if (argc != 2) {
    fprintf(stderr, "Usage: ./program <nom>\\n");
    return 1;
}
printf("Bonjour %s\\n", argv[1]);`,
        codeExplanation: "Si le nombre d’arguments est incorrect, le programme affiche la syntaxe d’utilisation sur stderr puis renvoie 1. Sinon, argv[1] est sûr à lire et le prénom est affiché.",
        note: "stderr est le flux des erreurs ; stdout est le flux normal de sortie. Le code de retour non nul permet aussi aux scripts de détecter l’échec.",
      },
    ],
    exercise: "Écris un programme qui exige exactement deux arguments et les affiche dans l’ordre inverse.",
  },
  {
    slug: "allocation-dynamique",
    title: "Allocation dynamique",
    summary: "Réserver, vérifier et libérer de la mémoire avec malloc et free.",
    group: "Données et mémoire",
    resources: [
      {
        title: "Dynamic Memory Allocation in C",
        description: "malloc, calloc, realloc, free et vérification des allocations.",
        source: "GeeksforGeeks",
        url: "https://www.geeksforgeeks.org/c/dynamic-memory-allocation-in-c-using-malloc-calloc-free-and-realloc/",
      },
      {
        title: "C Pointers",
        description: "Rappels sur les pointeurs utilisés pour gérer les allocations.",
        source: "GeeksforGeeks",
        url: "https://www.geeksforgeeks.org/c/c-pointers/",
      },
    ],
    sections: [
      {
        title: "Réserver une zone mémoire",
        paragraphs: [
          "malloc demande un bloc d’octets sur le tas et renvoie un pointeur vers le début du bloc. Il faut inclure stdlib.h et vérifier que le résultat n’est pas NULL avant de l’utiliser.",
          "La mémoire renvoyée par malloc n’est pas initialisée. Écris-y une valeur avant de la lire. calloc réserve plusieurs éléments et met leurs octets à zéro.",
          "sizeof *pointer exprime la taille de l’objet pointé et évite de répéter le type. L’expression *pointer n’est pas évaluée par sizeof dans ce contexte ; seule sa taille est utilisée.",
          "Vérifie que le nombre d’éléments multiplié par sizeof ne déborde pas size_t avant l’allocation. Une multiplication débordée peut réserver un bloc trop petit.",
        ],
        code: `#include <stdlib.h>

int *values = malloc(5 * sizeof *values);
if (values == NULL) {
    return 1;
}

values[0] = 42;`,
        codeExplanation: "malloc réserve assez de place pour cinq int. Si l’allocation échoue, elle renvoie NULL et le programme retourne une erreur. Après vérification, values[0] est initialisé avant toute lecture.",
      },
      {
        title: "Libérer sans fuite",
        paragraphs: [
          "Chaque bloc alloué avec malloc, calloc ou realloc doit finalement être libéré une seule fois avec free, lorsque le programme n’en a plus besoin.",
          "Après free, le pointeur ne doit plus être déréférencé. Le mettre à NULL évite certaines réutilisations accidentelles par cette variable, mais ne corrige pas les autres copies du même pointeur.",
          "Ne libère jamais une adresse qui ne vient pas d’un allocateur compatible, ne libère pas deux fois le même bloc et n’utilise pas un pointeur après sa libération.",
          "realloc peut agrandir ou déplacer un bloc. Stocke son résultat temporairement : si realloc échoue, l’ancien bloc reste valide et son adresse doit encore pouvoir être libérée.",
        ],
        code: `free(values);
values = NULL;`,
        codeExplanation: "free rend le bloc disponible à l’allocateur. Mettre ensuite values à NULL évite de déréférencer par erreur cette variable ; free(NULL) est sans effet.",
        note: "Une fuite mémoire est une allocation qui n’est jamais libérée. Un double free ou un accès après free sont aussi des erreurs graves. Pense à libérer les ressources également en cas d’erreur.",
      },
    ],
    exercise: "Alloue un tableau dynamique de n entiers, remplis-le, calcule sa somme puis libère-le, y compris dans les chemins d’erreur.",
  },
  {
    slug: "structures-listes",
    title: "Structures et listes chaînées",
    summary: "Regrouper des données et relier des éléments alloués dynamiquement.",
    group: "Données et mémoire",
    resources: [
      {
        title: "Structures in C",
        description: "Champs, initialisation et accès par point ou flèche.",
        source: "GeeksforGeeks",
        url: "https://www.geeksforgeeks.org/c/structures-c/",
      },
      {
        title: "C Pointers",
        description: "Notions utiles pour parcourir les liens entre les nœuds.",
        source: "GeeksforGeeks",
        url: "https://www.geeksforgeeks.org/c/c-pointers/",
      },
    ],
    sections: [
      {
        title: "Définir une structure",
        paragraphs: [
          "struct regroupe des champs nommés, éventuellement de types différents, sous un même type composé. Chaque champ conserve son propre type.",
          "L’opérateur point accède à un champ d’une variable structure. Si tu as un pointeur vers la structure, l’opérateur flèche -> est un raccourci pour (*pointer).champ.",
          "L’initialisation entre accolades suit l’ordre de déclaration des champs dans cet exemple. Les initialiseurs désignés comme .year = 1 rendent l’affectation moins dépendante de cet ordre en C99.",
          "Un typedef peut raccourcir le nom du type, mais la déclaration explicite struct reste courante et claire dans les projets C. Les structures peuvent être passées à une fonction ; une grande structure est souvent passée par pointeur pour éviter une copie.",
        ],
        code: `struct student {
    char name[32];
    int year;
};

struct student learner = {"Alex", 1};
printf("%s, annee %d\\n", learner.name, learner.year);`,
        codeExplanation: "La structure student contient un tableau de caractères et un entier. learner reçoit le nom Alex et l’année 1 ; le point sélectionne le champ à afficher.",
      },
      {
        title: "Construire une liste simplement chaînée",
        paragraphs: [
          "Une liste simplement chaînée est formée de nœuds. Chaque nœud contient une valeur et un pointeur vers le suivant ; le dernier pointe vers NULL. head pointe vers le premier élément, ou vaut NULL si la liste est vide.",
          "Pour parcourir la liste, avance un pointeur temporaire sans perdre head. La condition de parcours est généralement current != NULL ; current = current->next passe au nœud suivant.",
          "Pour ajouter un nœud, alloue-le, vérifie l’allocation, initialise sa valeur et son lien avant de l’insérer dans la liste. Définis qui est responsable de libérer chaque nœud.",
          "À la destruction, mémorise le nœud suivant avant de libérer le nœud courant ; après free, lire le champ next du nœud libéré est interdit.",
        ],
        code: `struct node {
    int value;
    struct node *next;
};

struct node *head = NULL;`,
        codeExplanation: "La structure node peut contenir un pointeur vers une autre node ; c’est ce lien qui permet de chaîner les éléments. head vaut NULL : la liste est actuellement vide.",
        note: "Les listes facilitent certaines insertions, mais chaque nœud demande une allocation et un pointeur à gérer. Un tableau est souvent plus simple et plus rapide pour un nombre fixe d’éléments.",
      },
    ],
    exercise: "Crée une petite liste de trois entiers, parcours-la pour afficher les valeurs, puis libère tous ses nœuds.",
  },
  {
    slug: "fichiers-descripteurs",
    title: "Fichiers et descripteurs",
    summary: "Découvrir les flux standard et les appels système de lecture et écriture.",
    group: "Unix et projets",
    resources: [
      {
        title: "read(2) Linux manual",
        description: "Valeur de retour, fin de fichier et lecture partielle.",
        source: "man7.org",
        url: "https://man7.org/linux/man-pages/man2/read.2.html",
      },
      {
        title: "write(2) Linux manual",
        description: "Écriture depuis un buffer vers un descripteur.",
        source: "man7.org",
        url: "https://man7.org/linux/man-pages/man2/write.2.html",
      },
    ],
    sections: [
      {
        title: "Les flux standard",
        paragraphs: [
          "Un processus dispose de trois flux usuels : stdin pour l’entrée, stdout pour la sortie normale et stderr pour les diagnostics. Ils correspondent généralement aux descripteurs 0, 1 et 2.",
          "La bibliothèque stdio propose fopen, fgets, fprintf et fclose pour travailler avec des flux de fichiers. fopen renvoie NULL en cas d’échec ; perror ajoute un message décrivant la dernière erreur système.",
          "Le mode r ouvre en lecture, w crée ou tronque en écriture et a ajoute à la fin. Les modes contenant + permettent lecture et écriture ; b désigne le mode binaire quand il est pertinent.",
          "Vérifie le retour de chaque opération et ferme les fichiers ouverts avec fclose. Pour lire ligne par ligne, fgets limite la quantité de données écrite dans le buffer.",
        ],
        code: `FILE *file = fopen("data.txt", "r");
if (file == NULL) {
    perror("data.txt");
    return 1;
}

fclose(file);`,
        codeExplanation: "On ouvre data.txt en lecture. En cas d’échec, perror décrit l’erreur et le programme quitte ; sinon, fclose ferme le flux et libère les ressources associées.",
      },
      {
        title: "Descripteurs et appels système",
        paragraphs: [
          "Sur Unix, open renvoie un descripteur entier ; read et write l’utilisent pour transférer des octets ; close termine l’utilisation. Ces appels système travaillent avec des buffers d’octets, pas avec des chaînes terminées par zéro.",
          "read et write renvoient le nombre d’octets effectivement traités, qui peut être inférieur à la quantité demandée. read renvoie 0 à la fin du fichier et -1 en cas d’erreur.",
          "Les appels peuvent être interrompus et doivent parfois être repris. Une boucle de lecture/écriture doit progresser avec le nombre d’octets déjà transférés et détecter toute erreur.",
          "open peut aussi recevoir des drapeaux comme O_RDONLY ou O_CREAT ; avec O_CREAT, il faut fournir les permissions. Les constantes et fonctions correspondantes sont déclarées dans fcntl.h et unistd.h.",
        ],
        code: `#include <unistd.h>

write(1, "Bonjour\\n", 8);`,
        codeExplanation: "write reçoit le descripteur 1 (stdout), l’adresse des octets à écrire et leur nombre. « Bonjour\\n » contient exactement huit octets ici ; le code réel doit vérifier la valeur de retour.",
        note: "Dans les exercices bas niveau, les descripteurs 0, 1 et 2 représentent habituellement stdin, stdout et stderr. Les appels système sont spécifiques à Unix et ne font pas partie de la bibliothèque C ISO.",
      },
    ],
    exercise: "Lis un fichier texte ligne par ligne et affiche son contenu sur stdout en vérifiant chaque erreur.",
  },
  {
    slug: "makefile",
    title: "Makefile et organisation",
    summary: "Compiler plusieurs fichiers et automatiser les commandes du projet.",
    group: "Unix et projets",
    resources: [
      {
        title: "GNU Make Manual",
        description: "Règles, dépendances, recettes et variables des Makefiles.",
        source: "GNU",
        url: "https://www.gnu.org/software/make/manual/make.html",
      },
    ],
    sections: [
      {
        title: "Lire une règle make",
        paragraphs: [
          "Un Makefile décrit comment fabriquer un résultat, appelé cible, à partir de fichiers dont il dépend. make compare les dates de modification : si la cible manque ou si une dépendance est plus récente, il exécute la recette.",
          "Une règle suit la forme cible: dépendances, puis une ou plusieurs commandes indentées en dessous. Par défaut, chaque ligne de commande doit commencer par une vraie tabulation, pas par des espaces. Une ligne vide ou une ligne commençant par # n’est pas une commande.",
          "La règle all est une cible pratique pour demander la construction principale du projet. make choisit par défaut la première cible normale du fichier ; placer all en premier rend l’intention claire.",
          "Une recette ne s’exécute que si la cible doit être mise à jour. Si make annonce que le projet est « up to date », cela signifie qu’il n’a trouvé aucune dépendance plus récente, pas qu’il a relancé la compilation.",
        ],
        code: `NAME = program
CC = gcc
CFLAGS = -Wall -Wextra -Werror
SRC = main.c

all: $(NAME)

$(NAME): $(SRC)
	$(CC) $(CFLAGS) $(SRC) -o $@

clean:
	rm -f $(NAME)

.PHONY: all clean`,
        codeExplanation: "NAME, CC et CFLAGS sont des variables Make ; $(NAME) demande à Make de remplacer le nom par sa valeur. La règle program dépend de main.c et $@ représente la cible courante, donc ici program. clean est une commande de nettoyage.",
        note: "La tabulation avant chaque commande est obligatoire avec la syntaxe Make classique. Vérifie-la dans ton éditeur : des espaces à cet endroit provoquent souvent « missing separator ».",
      },
      {
        title: "Variables et conventions utiles",
        paragraphs: [
          "NAME désigne couramment le nom de l’exécutable ; CC choisit le compilateur ; CFLAGS rassemble les options de compilation C ; SRC liste les fichiers source ; OBJ contient leurs fichiers objets. Ce sont des noms de convention, pas des mots réservés.",
          "L’affectation = est récursive : la valeur des variables référencées est développée quand Make les utilise. := développe immédiatement. Pour un Makefile débutant, = est généralement suffisant ; utilise une convention cohérente.",
          "$@ représente le nom de la cible, $< la première dépendance et $^ toutes les dépendances. Ces variables automatiques évitent de répéter les noms et rendent les règles génériques.",
          "Les options de compilation et celles de l’édition de liens ne sont pas toujours les mêmes. CFLAGS convient aux options du compilateur ; LDFLAGS sert aux options de lien, et LDLIBS aux bibliothèques à lier, souvent placées à la fin de la commande.",
        ],
        code: `NAME = program
CC = gcc
CFLAGS = -Wall -Wextra -Werror
SRC = main.c utils.c
OBJ = $(SRC:.c=.o)

$(NAME): $(OBJ)
	$(CC) $(OBJ) -o $@`,
        codeExplanation: "$(SRC:.c=.o) est une substitution de suffixe Make : main.c utils.c devient main.o utils.o. La cible est construite à partir des objets déjà compilés ; $@ vaut ici program.",
      },
      {
        title: "Compiler plusieurs fichiers sans tout reconstruire",
        paragraphs: [
          "L’option -c compile un fichier .c en fichier objet .o sans créer l’exécutable final. L’étape de lien combine ensuite les objets. Cette séparation permet de ne recompiler que le fichier source qui a changé.",
          "Une règle générique %.o: %.c indique comment fabriquer chaque objet à partir du fichier source de même nom. Dans cette règle, $< vaut le fichier .c correspondant et $@ le fichier .o à produire.",
          "Déclare les en-têtes utilisés comme dépendances des objets concernés. Ainsi, modifier utils.h provoque la recompilation des .c qui l’incluent, même si ces fichiers source n’ont pas changé.",
          "Les fichiers .h exposent les déclarations et prototypes partagés ; chaque .c inclut les en-têtes nécessaires. N’inclus pas un fichier .c dans un autre : compile les sources séparément et lie les objets.",
        ],
        code: `NAME = program
CC = gcc
CFLAGS = -Wall -Wextra -Werror
SRC = main.c utils.c
OBJ = $(SRC:.c=.o)

all: $(NAME)

$(NAME): $(OBJ)
	$(CC) $(OBJ) -o $@

%.o: %.c
	$(CC) $(CFLAGS) -c $< -o $@

main.o utils.o: utils.h

.PHONY: all`,
        codeExplanation: "make compile main.c et utils.c en objets avec la règle %.o, puis les lie pour créer program. La dépendance utils.h indique que les deux objets doivent être reconstruits si cet en-tête change. Si seul utils.c change, main.o reste à jour.",
        note: "L’extension .h dans les dépendances sert à détecter un changement d’interface ; on ne passe pas cet en-tête comme un fichier source à la commande de lien.",
      },
      {
        title: "Nettoyer et reconstruire",
        paragraphs: [
          "clean supprime les fichiers objets intermédiaires ; fclean supprime aussi l’exécutable final. Ces cibles ne produisent pas réellement un fichier appelé clean : elles exécutent des actions.",
          ".PHONY déclare explicitement les cibles d’action. Sans cette déclaration, si un fichier nommé clean existe, Make peut croire que la cible est déjà à jour et ne pas exécuter sa recette.",
          "re est une convention fréquente pour repartir d’une compilation complète : elle dépend de fclean puis de all. Dans un rendu EPITECH, respecte exactement les cibles demandées par l’énoncé, qui prévaut sur cet exemple générique.",
          "rm -f retire les fichiers nommés sans afficher d’erreur s’ils n’existent déjà pas. Limite toujours les chemins supprimés à des fichiers générés connus ; ne construis pas une commande de nettoyage vague ou dangereuse.",
        ],
        code: `clean:
	rm -f $(OBJ)

fclean: clean
	rm -f $(NAME)

re: fclean all

.PHONY: all clean fclean re`,
        codeExplanation: "clean enlève les objets ; fclean dépend de clean puis enlève le binaire ; re demande une reconstruction complète. Les noms sont déclarés .PHONY car ce sont des actions, pas des fichiers.",
      },
      {
        title: "Diagnostiquer les erreurs fréquentes",
        paragraphs: [
          "« missing separator » indique souvent qu’une recette commence par des espaces au lieu d’une tabulation. Vérifie la ligne qui suit une règle.",
          "« No rule to make target » signifie généralement qu’un nom de fichier ou une dépendance est mal écrit, ou qu’aucune règle ne sait produire cette cible. Vérifie les majuscules, le dossier courant et les chemins.",
          "Si une modification ne déclenche pas de recompilation, il manque peut-être une dépendance, notamment un fichier .h. Si tout est recompilé à chaque appel, une dépendance change constamment ou une cible est mal déclarée.",
          "make -n affiche les commandes qu’il prévoit d’exécuter sans les lancer. Cette vérification aide à comprendre les règles avant d’exécuter une recette.",
          "Après compilation, teste l’exécutable et vérifie le code de retour. Un Makefile qui se termine sans erreur prouve seulement que ses commandes ont réussi, pas que le programme répond correctement.",
        ],
        code: `make
make -n
make clean
make`,
        codeExplanation: "Le premier make construit la cible par défaut. make -n montre les commandes qui seraient lancées. clean enlève les objets ; le dernier make vérifie que le projet peut être reconstruit depuis une base propre.",
        note: "Les règles exactes de compilation, les noms des cibles et les commandes de nettoyage varient selon les projets. Les consignes du sujet et les contraintes de rendu restent prioritaires.",
      },
    ],
    exercise: "À partir de main.c, utils.c et utils.h, écris un Makefile avec les cibles all, clean, fclean et re. Compile chaque .c en .o, fais dépendre les objets concernés de utils.h, vérifie que modifier seulement utils.c ne recompile pas main.c, puis teste une reconstruction complète.",
    exerciseHints: [
      "Définis NAME, CC, CFLAGS, SRC et OBJ, puis fais dépendre l’exécutable de $(OBJ).",
      "Utilise une règle %.o: %.c et compile avec -c ; $< désigne le source et $@ l’objet à produire.",
      "Ajoute utils.h aux dépendances des objets qui l’incluent. N’ajoute pas les en-têtes à la commande de lien.",
      "clean supprime les objets, fclean dépend de clean et supprime aussi l’exécutable, re dépend de fclean et all.",
      "Teste make, make -n, make clean, make fclean puis make re. Vérifie la tabulation devant chaque commande.",
    ],
    quiz: {
      question: "Dans une recette de règle générique %.o: %.c, que désigne $< ?",
      options: [
        "Le nom de la cible .o",
        "La première dépendance, ici le fichier .c source",
        "Tous les fichiers du projet",
        "Le nom du Makefile",
      ],
      answerIndex: 1,
      explanation: "$< désigne la première dépendance de la règle. Pour %.o: %.c, c’est donc le fichier source correspondant ; $@ désigne la cible .o.",
    },
  },
  {
    slug: "coding-style",
    title: "Epitech C Coding Style",
    summary: "Organiser et formater ton code selon les règles de style C de l’école.",
    group: "Unix et projets",
    optionalPdf: "/docs/epitech_c_coding_style.pdf",
    resources: [
      {
        title: "Coding Style Checker",
        description: "Outil de contrôle mentionné dans le guide fourni. Vérifie les consignes de ton sujet pour l’installation.",
        source: "EPITECH",
        url: "https://github.com/Epitech/banana-coding-style-checker",
      },
      {
        title: "Linux Kernel Coding Style",
        description: "Convention de style C citée comme source d’inspiration dans le PDF.",
        source: "Linux Kernel",
        url: "https://www.kernel.org/doc/html/latest/process/coding-style.html",
      },
    ],
    sections: [
      {
        title: "À quoi sert le coding style ?",
        paragraphs: [
          "Le coding style est un ensemble de conventions de présentation et d’organisation. Il ne rend pas à lui seul un programme correct : un code qui respecte les règles de forme peut toujours contenir des erreurs de logique.",
          "Un style partagé permet aux autres personnes de relire ton travail, de comprendre les responsabilités des fichiers et des fonctions, puis de corriger ou faire évoluer le programme plus facilement.",
          "Le PDF fourni indique quatre niveaux de sévérité : fatal, major, minor et info. Traite en priorité les violations bloquantes ou majeures et demande confirmation à l’équipe pédagogique quand une règle de ton énoncé n’est pas claire.",
          "Le document fourni présente une version précise des règles. Les critères et les outils peuvent évoluer selon la promotion ou le projet : le PDF et les consignes associés à ton sujet restent les références pour ton rendu.",
        ],
        code: `#include <stddef.h>

int get_user_score(int const *score)
{
    if (score == NULL) {
        return -1;
    }
    return *score;
}`,
        codeExplanation: "get_user_score contient un verbe et décrit son résultat. Le paramètre est en lecture seule. Les accolades, les espaces, le retour à la ligne et l’indentation de quatre espaces illustrent plusieurs conventions du document fourni.",
        note: "Le PDF indique que le coding style est une convention syntaxique : le respecter ne remplace ni les tests ni la vérification du fonctionnement.",
      },
      {
        title: "Organisation des fichiers et en-tête",
        paragraphs: [
          "Le dépôt doit contenir les sources utiles, pas les fichiers temporaires ou compilés (.o, .a, .so). Le document demande que les sources C utilisent les extensions .c et .h.",
          "Chaque fichier source doit correspondre à une entité logique et regrouper les fonctions qui vont ensemble. Le PDF fourni fixe un maximum de dix fonctions par fichier, dont au plus cinq non statiques ; au-delà, sépare les responsabilités.",
          "Choisis des noms anglais, précis, explicites et en snake_case pour les fichiers et dossiers. Par exemple, pathfinding.c décrit mieux son rôle que algo.c.",
          "Selon la règle C-G1 du document, les fichiers C, les en-têtes et les Makefiles commencent par l’en-tête standard Epitech, avec l’année, le nom du projet et une description utile du fichier. Utilise la commande Emacs indiquée dans ton environnement pour le générer.",
          "Le PDF demande aussi une seule ligne vide entre les définitions de fonctions, des fins de ligne Unix (LF), aucun espace final et une ligne de fin de fichier.",
        ],
        code: `/*
** EPITECH PROJECT, 2026
** piscine_c
** File description:
** Functions for validating user input.
*/

#include "input.h"

int is_input_valid(char const *input)
{
    return input != NULL && input[0] != '\\0';
}`,
        codeExplanation: "L’en-tête décrit le projet et le rôle du fichier. input.h est l’interface locale incluse. is_input_valid décrit l’action et gère explicitement le pointeur nul avant de lire input[0]. Adapte le contenu de l’en-tête aux métadonnées réelles de ton projet.",
      },
      {
        title: "Fonctions courtes et responsabilités",
        paragraphs: [
          "Une fonction devrait accomplir une tâche cohérente sans mélanger plusieurs niveaux d’abstraction. Le nom contient un verbe et décrit cette tâche en anglais, en snake_case.",
          "Le document fourni limite un corps de fonction à vingt lignes et à quatre paramètres maximum. Une fonction sans paramètre s’écrit avec void dans sa déclaration : int get_count(void).",
          "Si une structure est passée à une fonction, le guide demande de la transmettre avec un pointeur plutôt que de la copier. Ajoute const si la fonction ne doit pas modifier l’objet pointé.",
          "Le PDF demande d’éviter les commentaires à l’intérieur du corps d’une fonction. Privilégie des noms clairs et une fonction simple ; place une explication utile au-dessus du prototype si elle est nécessaire.",
          "Les fonctions imbriquées ne sont pas du C standard portable : chaque fonction doit être définie à portée de fichier.",
        ],
        code: `struct point {
    int x;
    int y;
};

int get_point_x(struct point const *point)
{
    if (point == NULL) {
        return 0;
    }
    return point->x;
}`,
        codeExplanation: "La fonction reçoit l’adresse de la structure, conformément à C-F7. const protège le point contre les modifications ; -> accède au champ x à travers le pointeur. Cette petite fonction garde une responsabilité unique.",
      },
      {
        title: "Indentation, espaces et blocs",
        paragraphs: [
          "Dans la règle C-L2 du PDF, chaque niveau d’indentation utilise quatre espaces et aucune tabulation. Augmente l’indentation à chaque nouveau bloc.",
          "La règle C-L3 recommande un seul espace comme séparateur : un espace après une virgule ou un mot-clé de contrôle, aucun avant une virgule ou un point-virgule, et des espaces de part et d’autre des opérateurs binaires.",
          "Les accolades ouvrantes des fonctions se placent sur une ligne à part ; celles des structures de contrôle restent à la fin de leur ligne. L’accolade fermante est seule, sauf devant else / else if, après enum / struct, ou dans un do-while.",
          "Une instruction par ligne. Ne combine pas plusieurs affectations, appels, tests et actions sur la même ligne. Le PDF tolère un bloc sans accolades sur une ligne, mais recommande de garder les accolades pour prévenir les erreurs quand le bloc grandit.",
          "Dans une fonction, déclare les variables au début, une par instruction. Sépare ces déclarations du reste du corps par une ligne vide ; le document ne veut pas d’autres lignes vides dans le corps de la fonction.",
        ],
        code: `int calculate_total(int first, int second)
{
    int total = 0;

    if (first > 0) {
        total = first + second;
    } else {
        total = second;
    }
    return total;
}`,
        codeExplanation: "Les variables sont déclarées une par ligne au début. Une ligne vide sépare les déclarations du traitement. Chaque instruction est isolée ; les opérateurs sont espacés et les blocs sont indentés de quatre espaces.",
      },
      {
        title: "Identifiants, constantes et pointeurs",
        paragraphs: [
          "La règle C-V1 impose des identifiants en anglais et en snake_case. Les types définis avec typedef se terminent par _t ; les macros, constantes globales et éléments d’enum utilisent UPPER_SNAKE_CASE.",
          "Une structure ne doit rassembler que des champs appartenant à une même entité et devrait rester compacte. Ne rassemble pas des données sans rapport dans une structure fourre-tout.",
          "Dans la règle C-V3, l’étoile est attachée au nom du pointeur et précédée d’un espace : int *score. Pour un pointeur de pointeur : char **argv. Dans une expression, l’étoile de déréférencement est collée à l’opérande : *score.",
          "Utilise le type le plus précis pour représenter une donnée : size_t pour des tailles, ptrdiff_t pour une différence entre pointeurs et les types à largeur fixe quand l’interface l’exige.",
          "Les globales sont à éviter ; le document n’autorise comme globales que des constantes correctement déclarées const. Les fonctions et globales utilisées uniquement dans un fichier doivent être static.",
        ],
        code: `#include <stddef.h>

#define MAX_USERS 32

typedef struct user {
    char name[MAX_USERS];
} user_t;

static int is_user_name_valid(user_t const *user)
{
    if (user == NULL) {
        return 0;
    }
    return user->name[0] != '\\0';
}

int main(void)
{
    user_t user = {"Alex"};

    return is_user_name_valid(&user) ? 0 : 1;
}`,
        codeExplanation: "MAX_USERS est en majuscules avec des underscores. user_t suit la convention des types typedef. is_user_name_valid est statique : elle n’est visible que dans ce fichier. Le test protège contre NULL, puis -> accède au champ name à travers le pointeur. main utilise réellement cette fonction.",
        note: "Le PDF signale que les règles de pointeurs sont liées à l’usage : l’étoile de multiplication n’est pas écrite comme celle d’une déclaration de pointeur.",
      },
      {
        title: "Conditions, macros et extensions",
        paragraphs: [
          "Selon C-C1, un if avec ses branches else if et else ne doit pas dépasser trois branches, et les blocs conditionnels imbriqués d’une profondeur de trois ou plus doivent être évités. Une fonction auxiliaire ou un switch peut clarifier les nombreux cas.",
          "Le ternaire peut remplacer une expression simple si son résultat est utilisé. Le document interdit les ternaires imbriqués ou enchaînés ainsi que les ternaires utilisés uniquement pour déclencher un effet de bord.",
          "Le mot-clé goto est interdit par la règle C-C3. Des retours anticipés bien nommés peuvent souvent réduire l’imbrication.",
          "Les en-têtes contiennent les prototypes, types, déclarations de structures et enums, déclarations globales, macros et fonctions static inline prévues par le document. Protège-les avec #ifndef, #define et #endif ; n’utilise pas #pragma once selon ce guide.",
          "Une macro doit tenir sur une ligne et correspondre à une seule expression ou instruction. Évite les macros qui masquent une expression longue ou un bloc.",
          "Le PDF proscrit les extensions spécifiques à un compilateur, comme __attribute__, ainsi que l’assembleur inline. Privilégie les fonctionnalités portables du C attendu par le sujet.",
        ],
        code: `#ifndef USER_H
#define USER_H

#define USER_NAME_MAX 32

typedef struct user {
    char name[USER_NAME_MAX];
} user_t;

int is_user_name_valid(user_t const *user);

#endif`,
        codeExplanation: "La garde empêche l’inclusion répétée du même en-tête dans une unité de compilation. L’en-tête déclare ici une constante symbolique, un type cohérent et le prototype de la fonction ; son implémentation reste dans un fichier .c.",
      },
      {
        title: "Vérifier son code avant le rendu",
        paragraphs: [
          "Le PDF décrit Banana comme un vérificateur partiel : certaines règles sont automatisées, d’autres doivent être vérifiées manuellement. Un outil ne peut pas juger à ta place si tes fonctions ont une responsabilité claire ou si tes noms sont compréhensibles.",
          "Avant le rendu, vérifie les noms, l’en-tête, les extensions, les fichiers temporaires, la taille des fonctions, le nombre de paramètres, les retours de ligne, les espaces finaux et les règles de ton Makefile.",
          "Compile avec les options exigées par ton sujet, lance les tests et relis le diff. Le style complète les tests et la correction fonctionnelle, il ne les remplace pas.",
          "Le PDF précise qu’en cas d’ambiguïté, il faut demander à l’équipe pédagogique locale. Les règles de l’énoncé ou de la moulinette de ton projet peuvent préciser la version applicable.",
        ],
        code: `gcc -Wall -Wextra -Werror -std=c99 main.c user.c -o program
./program`,
        codeExplanation: "L’exemple illustre une compilation avec avertissements stricts et plusieurs fichiers source. La deuxième ligne lance le programme construit.",
        note: "La barre oblique inverse peut servir à continuer une commande dans certains shells, mais le PDF interdit de l’utiliser pour couper une instruction dans un fichier C. Pour une expression C longue, place ses éléments sur plusieurs lignes.",
      },
    ],
    exercise: "Prends un de tes exercices C et fais une revue avec le PDF : en-tête, noms, fonctions, indentation, structures de contrôle, en-têtes et fichiers temporaires.",
  },
  {
    slug: "tests-unitaires-criterion",
    title: "Tests unitaires avec Criterion",
    summary: "Tester des fonctions C automatiquement avec le framework Criterion.",
    group: "Tests et qualité",
    resources: [
      {
        title: "Unit test simplified in C - Criterion",
        description: "Tutoriel d’introduction à l’organisation d’un petit projet et à ses premiers tests.",
        source: "Hwisnu · Bear Blog",
        url: "https://hwisnu.bearblog.dev/unit-test-simplified-in-c-criterion/",
      },
      {
        title: "Criterion — Introduction",
        description: "Présentation officielle des suites, tests et fonctionnalités du framework.",
        source: "Criterion",
        url: "https://criterion.readthedocs.io/en/master/intro.html",
      },
      {
        title: "Criterion — Installation et compilation",
        description: "Prérequis et étapes pour lier Criterion à un exécutable de tests.",
        source: "Criterion",
        url: "https://criterion.readthedocs.io/en/master/setup.html",
      },
      {
        title: "Criterion — Anciennes assertions",
        description: "Référence de l’API d’assertions utilisée dans le tutoriel.",
        source: "Criterion",
        url: "https://criterion.readthedocs.io/en/master/assert_old.html",
      },
    ],
    sections: [
      {
        title: "À quoi servent les tests unitaires ?",
        paragraphs: [
          "Un test unitaire appelle une petite unité de code — souvent une fonction — avec des entrées connues, puis vérifie que le résultat correspond à ce qui était attendu. Il complète les tests manuels en rendant les vérifications répétables.",
          "Une suite de tests protège contre les régressions : après avoir modifié une fonction, on relance les tests pour vérifier que les comportements déjà validés tiennent toujours.",
          "Un bon test a une intention claire, un résultat attendu indépendant de l’implémentation et couvre un cas précis. Pour une fonction arithmétique, pense aux valeurs positives, négatives, nulles et aux limites définies par son contrat.",
          "Criterion est un framework de tests pour C et C++. Il enregistre automatiquement les tests déclarés et fournit un exécutable de test sans obliger à écrire soi-même un main dans le fichier de tests.",
        ],
        code: `int add(int left, int right)
{
    return left + right;
}`,
        codeExplanation: "Cette fonction est l’unité à tester. En la séparant du code qui lit les entrées utilisateur, on peut appeler add avec plusieurs valeurs directement et comparer son résultat sans démarrer toute l’application.",
      },
      {
        title: "Séparer interface, implémentation et tests",
        paragraphs: [
          "Garde la fonction testée dans un fichier source dédié, expose son prototype dans un en-tête et place les tests Criterion dans un fichier séparé. Cette organisation ressemble à celle d’un petit vrai projet.",
          "Un test Criterion est déclaré avec Test(nom_de_suite, nom_du_test). Le premier nom regroupe les tests liés à une fonctionnalité ; le second décrit le cas vérifié. Inclue criterion/criterion.h dans le fichier de test.",
          "Le fichier testé ne doit pas contenir le framework. Compile le fichier de test et l’implémentation ensemble, puis lie l’exécutable avec Criterion.",
        ],
        code: `/* include/math.h */
#ifndef MATH_H
#define MATH_H

int add(int left, int right);

#endif`,
        codeExplanation: "math.h annonce l’interface publique de la fonction. La garde évite de traiter cet en-tête plusieurs fois dans une même unité de compilation.",
      },
      {
        title: "Écrire des assertions",
        paragraphs: [
          "Une assertion compare le résultat obtenu à une valeur attendue. Si l’assertion échoue, Criterion signale le test en échec et affiche les informations utiles pour retrouver le problème.",
          "Avec l’API classique, cr_assert_eq(actual, expected) vérifie l’égalité et arrête le test courant si elle échoue. cr_expect_eq effectue une vérification non fatale : le test continue, mais sera tout de même marqué comme échoué.",
          "Pour les nombres flottants, une égalité exacte est généralement inadaptée à cause des approximations binaires. Utilise cr_assert_float_eq(actual, expected, epsilon), où epsilon est la tolérance acceptable.",
          "L’article fourni montre aussi des assertions volontairement erronées pour illustrer les rapports d’échec. Dans tes propres tests, calcule la valeur attendue à partir du contrat de la fonction, et non pour faire correspondre le résultat observé.",
        ],
        code: `/* tests/test_math.c */
#include <criterion/criterion.h>
#include "math.h"

Test(math, adds_positive_numbers)
{
    cr_assert_eq(add(2, 3), 5);
}

Test(math, adds_zero)
{
    cr_assert_eq(add(0, 0), 0);
}`,
        codeExplanation: "Criterion découvre automatiquement ces tests. math est le nom de la suite, adds_positive_numbers et adds_zero décrivent deux cas différents. Chaque assertion compare le résultat de la fonction à une valeur attendue.",
        note: "Cet exemple utilise l’API classique cr_assert_eq présentée dans le tutoriel. La documentation actuelle de Criterion la décrit comme ancienne mais stable, avec un remplacement prévu avant Criterion 3.0 ; vérifie la version installée et sa référence d’assertions.",
      },
      {
        title: "Compiler et lancer le banc de tests",
        paragraphs: [
          "Installe Criterion avec le gestionnaire de paquets ou la méthode adaptée à ton système, en suivant la documentation officielle. Le tutoriel mentionne libcriterion-dev pour Debian et Ubuntu ; le nom du paquet et la procédure diffèrent sur d’autres plateformes.",
          "La compilation inclut à la fois les fichiers de tests et les fichiers qui contiennent les fonctions réelles. Oublier math.c peut produire une erreur de lien, même si le test et son en-tête compilent séparément.",
          "Criterion doit être lié à l’exécutable de test. Sur un système où pkg-config fournit le paquet criterion, sa sortie --cflags --libs peut donner les options adaptées à l’installation locale.",
          "Lance ensuite le binaire de tests. Criterion affiche les tests réussis et ceux qui échouent ; le code de sortie permet aussi à un script ou à une intégration continue de détecter un échec.",
        ],
        code: `gcc -Wall -Wextra -Werror \\
    tests/test_math.c src/math.c -o unit_tests -lcriterion
./unit_tests`,
        codeExplanation: "La commande compile le fichier de tests et l’implémentation, puis lie Criterion. Si le framework n’est pas dans les chemins standard, ajoute les options fournies par pkg-config ou par la configuration de ton installation. Le binaire unit_tests exécute les tests enregistrés.",
        note: "La barre oblique inverse ici est une continuation de commande du shell, pas du code C. Dans un Makefile, les options Criterion doivent être ajoutées à la recette de l’exécutable de tests, et non forcément à la commande de l’application livrée.",
      },
      {
        title: "Choisir de bons cas de test",
        paragraphs: [
          "Teste le cas nominal, les valeurs limites et les cas particuliers du contrat. Pour une fonction qui additionne, vérifie notamment les signes différents et le comportement attendu quand une entrée vaut zéro.",
          "Un test doit échouer si le comportement devient incorrect : vérifie une propriété observable, pas seulement que la fonction s’est exécutée. Ajoute un message à l’assertion si la raison d’un échec ne serait pas évidente.",
          "Garde les tests indépendants : un test ne doit pas dépendre de l’ordre d’exécution ni de l’état laissé par un autre. Criterion exécute les tests dans des processus isolés, ce qui aide à rapporter certains plantages, mais ne dispense pas de nettoyer les ressources de chaque test.",
          "Évite d’ajouter les fichiers de tests au binaire normal si ton sujet demande un exécutable précis. Une cible test dédiée dans le Makefile permet de compiler et lancer les tests sans changer la cible de rendu.",
        ],
        code: `Test(math, adds_negative_and_positive)
{
    cr_assert_eq(add(-4, 7), 3);
}

Test(math, reports_expected_float_value)
{
    float actual = get_average(2, 4, 6);

    cr_assert_float_eq(actual, 4.0, 0.001);
}`,
        codeExplanation: "Le premier cas vérifie une addition avec des signes différents. Le second accepte un petit écart de représentation des flottants grâce à epsilon. Les prototypes de add et get_average doivent être déclarés dans l’en-tête inclus par le fichier de test.",
      },
    ],
    exercise: "Ajoute une fonction multiply dans math.c, expose son prototype dans math.h puis écris des tests Criterion pour deux nombres positifs, un zéro et un nombre négatif. Lance aussi un test volontairement incorrect pour observer le rapport d’échec, puis corrige son résultat attendu.",
    exerciseHints: [
      "Commence par écrire le prototype int multiply(int left, int right); dans math.h.",
      "Crée une suite Test(math, ...) par cas. Garde les valeurs attendues écrites explicitement dans les assertions.",
      "Vérifie le calcul à la main, compile le test avec math.c et -lcriterion, puis lance l’exécutable de test.",
    ],
    quiz: {
      question: "Quelle assertion continue le test après un échec, tout en marquant quand même le test comme échoué ?",
      options: ["cr_assert_eq", "cr_expect_eq", "assert_eq", "printf"],
      answerIndex: 1,
      explanation: "cr_expect_eq est non fatale : les lignes suivantes s’exécutent. cr_assert_eq arrête le test au premier échec.",
    },
  },
  {
    slug: "chaines-et-libc",
    title: "Chaînes et fonctions de la libc",
    summary: "Parcourir des chaînes C et comprendre les fonctions classiques de string.h.",
    group: "Données et mémoire",
    resources: [
      {
        title: "C string and byte utilities",
        description: "Référence des chaînes terminées par zéro et fonctions de string.h.",
        source: "cppreference",
        url: "https://en.cppreference.com/w/c/string/byte",
      },
      {
        title: "Strings in C",
        description: "Introduction aux chaînes et aux opérations courantes.",
        source: "GeeksforGeeks",
        url: "https://www.geeksforgeeks.org/c/strings-in-c/",
      },
    ],
    sections: [
      {
        title: "Une chaîne est un tableau terminé par zéro",
        paragraphs: [
          "Le langage C ne possède pas de type chaîne natif. Une chaîne est une suite de caractères stockée dans un tableau de char et terminée par '\0'. Toutes les fonctions de chaîne classiques s’appuient sur ce terminateur pour savoir où s’arrêter.",
          "Un tableau qui contient le texte « chat » doit avoir cinq cases : quatre pour c, h, a, t, puis une pour '\0'. Le terminateur fait partie du stockage, mais pas de la longueur renvoyée par strlen.",
          "Le type char représente un octet, pas nécessairement un caractère Unicode complet. Les caractères accentués en UTF-8 peuvent occuper plusieurs octets ; un parcours par char parcourt les octets.",
          "Avant de parcourir une chaîne reçue en paramètre, son contrat doit préciser qu’elle est terminée par zéro et valide. Une chaîne mal formée peut provoquer des lectures hors limites.",
        ],
        code: `char word[] = "chat";
size_t length = 0;

while (word[length] != '\\0') {
    length++;
}
printf("%zu\\n", length);`,
        codeExplanation: "L’initialisation de word ajoute automatiquement le caractère nul final. length avance tant que le caractère courant n’est pas le terminateur ; la boucle s’arrête après les quatre lettres.",
      },
      {
        title: "strlen, strcmp et strchr",
        paragraphs: [
          "strlen, déclarée dans string.h, compte les caractères qui précèdent '\0'. Son coût est proportionnel à la longueur de la chaîne, car elle doit la parcourir.",
          "strcmp compare deux chaînes caractère par caractère et renvoie un entier négatif, zéro ou positif selon l’ordre. Pour tester l’égalité, vérifie strcmp(a, b) == 0 ; ne compare pas les pointeurs avec ==.",
          "strchr cherche la première occurrence d’un caractère et renvoie un pointeur vers sa position, ou NULL si le caractère n’est pas trouvé. Le terminateur nul peut lui aussi être recherché.",
          "Ces fonctions ne connaissent pas la taille réelle du tableau : elles supposent que l’adresse fournie pointe vers une chaîne correctement terminée.",
        ],
        code: `#include <stdio.h>
#include <string.h>

int main(void)
{
    char const *name = "Epitech";

    printf("%zu\\n", strlen(name));
    printf("%d\\n", strcmp(name, "Epitech") == 0);
    return 0;
}`,
        codeExplanation: "strlen renvoie 7 pour le mot Epitech. strcmp renvoie zéro quand les chaînes sont identiques ; l’expression == 0 transforme ce résultat en condition vraie.",
        note: "strcmp ne promet pas de renvoyer exactement -1 ou 1 : seule la relation inférieur à zéro, égal à zéro ou supérieur à zéro est garantie.",
      },
      {
        title: "Réimplémenter une fonction simplement",
        paragraphs: [
          "Dans certains exercices, on te demandera de réécrire une fonction de la libc. Commence par formaliser son contrat : entrées autorisées, résultat attendu, cas vide et comportement sur les limites.",
          "Pour une version personnelle de strlen, avance un indice jusqu’au terminateur. Pour strcmp, avance tant que les caractères sont égaux et non nuls, puis compare les caractères de divergence comme unsigned char.",
          "Garde les règles de la Piscine à l’esprit : la fonction doit rester courte, les variables être initialisées, et la fonction ne doit pas accéder à une case au-delà du terminateur.",
          "Les fonctions de copie nécessitent une capacité connue pour la destination. strcpy ne reçoit pas cette capacité et ne peut pas empêcher un débordement ; dans un exercice, vérifie le contrat et calcule l’espace avant la copie.",
        ],
        code: `size_t my_strlen(char const *str)
{
    size_t length = 0;

    while (str[length] != '\\0') {
        length++;
    }
    return length;
}`,
        codeExplanation: "length commence à zéro, augmente une fois par octet non nul, puis vaut le nombre de caractères avant '\0'. Comme strlen, cette fonction suppose que str désigne une chaîne terminée correctement.",
      },
    ],
    exercise: "Implémente my_strlen et my_strcmp sans appeler strlen ni strcmp. Compare-les à la libc pour des chaînes vides, identiques, différentes et de longueurs différentes.",
    exerciseHints: [
      "Pour my_strlen, utilise size_t pour l’indice et arrête-toi à '\\0'.",
      "Pour my_strcmp, avance les deux pointeurs pendant que les octets sont égaux et non nuls.",
      "Teste séparément le cas où les chaînes sont identiques, où l’une est un préfixe de l’autre, et où le premier caractère diffère.",
    ],
    quiz: {
      question: "Quelle condition indique que deux chaînes C contiennent le même texte ?",
      options: ["left == right", "strcmp(left, right) == 0", "strlen(left) == strlen(right)", "left[0] == right[0]"],
      answerIndex: 1,
      explanation: "strcmp renvoie zéro si toutes les positions comparées sont identiques jusqu’au terminateur. La même longueur ou le même premier caractère ne suffit pas.",
    },
  },
  {
    slug: "debugging-outils",
    title: "Déboguer avec GDB et les sanitizers",
    summary: "Trouver l’origine d’un bug à l’aide du débogueur et des outils mémoire.",
    group: "Tests et qualité",
    resources: [
      {
        title: "GDB Documentation",
        description: "Guide officiel du débogueur GNU.",
        source: "GNU",
        url: "https://www.gnu.org/software/gdb/documentation/",
      },
      {
        title: "Valgrind Quick Start",
        description: "Détecter les erreurs mémoire et les fuites avec Memcheck.",
        source: "Valgrind",
        url: "https://valgrind.org/docs/manual/quick-start.html",
      },
      {
        title: "AddressSanitizer",
        description: "Détecter les accès invalides, use-after-free et doubles libérations.",
        source: "LLVM Clang",
        url: "https://clang.llvm.org/docs/AddressSanitizer.html",
      },
    ],
    sections: [
      {
        title: "Réduire le problème avant de déboguer",
        paragraphs: [
          "Un bug se diagnostique plus vite lorsqu’il est reproductible. Note les entrées précises, les étapes et le résultat attendu ; réduis ensuite le cas jusqu’au plus petit programme qui reproduit le problème.",
          "Lis le premier message d’erreur et la première ligne de ta propre pile d’appels. Le dernier endroit où le programme plante n’est pas toujours l’endroit où l’état a été corrompu.",
          "Compile avec les symboles de débogage (-g). Les avertissements détectent de nombreux problèmes dès la compilation ; ajoute aussi les options du sujet sans les remplacer.",
        ],
        code: `gcc -Wall -Wextra -Werror -g -O0 main.c -o program
./program`,
        codeExplanation: "-g conserve les informations de ligne et de fonction utiles au débogueur ; -O0 limite les transformations qui rendent les variables plus difficiles à inspecter. Le reste de la commande conserve les avertissements stricts.",
      },
      {
        title: "Les commandes GDB essentielles",
        paragraphs: [
          "GDB permet d’arrêter le programme sur un point d’arrêt, d’avancer instruction par instruction et d’observer les variables à l’instant où le bug se produit.",
          "break main pose un point d’arrêt à l’entrée de main. run démarre le programme, next avance sans entrer dans les fonctions appelées, step entre dans une fonction et print affiche une expression.",
          "Si le programme plante, bt (backtrace) affiche la pile d’appels. Examine la première frame appartenant à ton code, puis inspecte les variables utiles avec print.",
          "Les noms de commandes peuvent varier dans d’autres débogueurs ; lis leur aide et les arguments du programme doivent être transmis au lancement prévu par l’outil.",
        ],
        code: `gdb ./program
(gdb) break main
(gdb) run
(gdb) next
(gdb) print score
(gdb) bt`,
        codeExplanation: "Les lignes entre parenthèses sont des commandes tapées dans GDB, pas du C. Cette séquence démarre à main, avance, examine score puis affiche la pile si tu dois comprendre le chemin d’exécution.",
      },
      {
        title: "Vérifier les accès mémoire",
        paragraphs: [
          "AddressSanitizer, activé à la compilation avec Clang ou GCC, peut signaler des accès hors limites, une utilisation après free et certaines doubles libérations. Il arrête souvent le programme dès la première erreur détectée.",
          "Valgrind Memcheck analyse l’exécutable pour repérer des lectures ou écritures invalides, l’usage de valeurs non initialisées et des allocations non libérées. Il est particulièrement disponible sur Linux ; son support dépend de la plateforme.",
          "Ces outils complètent les tests : ils aident à détecter un défaut sur les chemins réellement exécutés, mais ne prouvent pas que tous les chemins sont corrects.",
          "Lisez le premier rapport complet : il indique le type d’erreur, la ligne fautive et souvent l’endroit où le bloc mémoire a été alloué.",
        ],
        code: `clang -Wall -Wextra -Werror -g -O1 \\
    -fsanitize=address,undefined main.c -o program
./program

valgrind --leak-check=full ./program`,
        codeExplanation: "La première compilation active AddressSanitizer et UndefinedBehaviorSanitizer. La dernière commande montre l’usage courant de Memcheck sur les systèmes qui fournissent Valgrind ; les deux outils peuvent ne pas être disponibles partout.",
        note: "N’ajoute pas les options de sanitizers à la commande de rendu si l’énoncé impose un compilateur ou des options spécifiques. Utilise-les comme aide locale au débogage.",
      },
    ],
    exercise: "Crée un programme de test avec un accès hors limites, compile-le avec AddressSanitizer, lis le rapport, corrige l’indice puis vérifie à nouveau.",
    exerciseHints: [
      "Un tableau de taille n possède les indices de 0 à n - 1.",
      "Ajoute -g et -fsanitize=address à la compilation puis exécute exactement le chemin fautif.",
      "Lis la première ligne du rapport ASan et la ligne source indiquée ; corrige la cause plutôt que de masquer l’avertissement.",
    ],
    quiz: {
      question: "Quelle commande GDB montre la pile d’appels après un crash ?",
      options: ["run", "print", "bt", "next"],
      answerIndex: 2,
      explanation: "bt signifie backtrace et affiche la pile des fonctions qui ont mené à l’endroit courant.",
    },
  },
  {
    slug: "git-piscine",
    title: "Git pendant la Piscine",
    summary: "Suivre ses changements, faire des commits propres et travailler sans perdre son code.",
    group: "Unix et projets",
    resources: [
      {
        title: "Pro Git Book",
        description: "Livre complet sur les bases, l’historique et les branches de Git.",
        source: "Git",
        url: "https://git-scm.com/book/en/v2",
      },
      {
        title: "Git Reference",
        description: "Rappel concis des commandes principales.",
        source: "Git",
        url: "https://git-scm.com/docs",
      },
    ],
    sections: [
      {
        title: "Comprendre l’état du dépôt",
        paragraphs: [
          "Git suit un dépôt et ses instantanés appelés commits. git status distingue les changements non suivis, modifiés et déjà placés dans la zone de préparation (staging).",
          "git diff montre les modifications non préparées ; git diff --staged montre celles qui seront enregistrées au prochain commit. Relis le diff avant de valider.",
          "Un commit local est un point de sauvegarde nommé par un message. Un commit ne contient que les fichiers de la zone de préparation, pas automatiquement toutes les modifications du dossier.",
          "Évite d’ajouter les exécutables, fichiers objets, fichiers temporaires ou données personnelles. Un .gitignore peut exclure les fichiers générés selon les conventions de ton projet.",
        ],
        code: `git status
git diff
git add src/main.c
git diff --staged
git commit -m "Add input validation"`,
        codeExplanation: "On inspecte l’état et les différences, on ajoute explicitement un fichier à la préparation, on relit exactement ce qui sera enregistré puis on crée un commit avec un message court.",
      },
      {
        title: "Retrouver son travail et éviter les pertes",
        paragraphs: [
          "git log --oneline affiche l’historique sous forme compacte. git show examine un commit et ses différences ; git status doit devenir un réflexe avant les manipulations importantes.",
          "Un commit crée un instantané local, pas une copie distante. Si le projet utilise un dépôt distant, les consignes de l’équipe définissent quand faire push ou pull.",
          "Avant d’utiliser une commande qui réécrit l’historique ou supprime des modifications, lis son aide et vérifie le statut du dépôt. git restore peut abandonner des changements locaux : ne l’exécute pas sans savoir exactement ce qu’il va effacer.",
          "Les branches permettent de travailler séparément sur une évolution. En Piscine, utilise le flux demandé par ton projet plutôt que d’ajouter des branches ou des commandes non requises.",
        ],
        code: `git log --oneline -5
git show --stat HEAD
git status`,
        codeExplanation: "Cette vérification affiche les cinq derniers commits, résume les fichiers du commit courant et montre si le dossier de travail contient des changements non enregistrés.",
        note: "Git versionne les fichiers que tu ajoutes : il ne sauvegarde ni les modifications non commitées ailleurs ni les fichiers ignorés par .gitignore.",
      },
      {
        title: "Conflits et collaboration",
        paragraphs: [
          "Un conflit apparaît lorsque Git ne peut pas combiner automatiquement deux modifications qui se chevauchent. Git marque les zones concernées dans le fichier avec des séparateurs.",
          "Lis les deux versions, choisis ou fusionne leur contenu, supprime les marqueurs, teste le résultat puis marque le fichier résolu avec git add avant de terminer l’opération.",
          "Des commits petits et cohérents aident à identifier une régression et à collaborer. Un message utile décrit l’intention, par exemple « Handle empty input », plutôt que « update ».",
          "Avant un rendu, vérifie le dépôt avec git status et inspecte le dernier diff ou commit pour ne pas oublier un fichier nécessaire.",
        ],
        code: `<<<<<<< HEAD
int limit = 10;
=======
int limit = 20;
>>>>>>> feature-branch`,
        codeExplanation: "Ces marqueurs indiquent un conflit et ne sont pas du code C valide. Ils doivent être remplacés par la version correcte, puis le programme doit être compilé et testé.",
      },
    ],
    exercise: "Dans un dépôt d’exercice, modifie un fichier, examine le diff, crée un commit explicite puis vérifie avec git status et git show que seul le changement voulu est enregistré.",
    exerciseHints: [
      "Commence par git status et ne modifie que des fichiers de ton dépôt de test.",
      "Après la modification, compare git diff et git diff --staged pour comprendre la différence entre travail et staging.",
      "Fais un commit sur le dépôt d’exercice, puis utilise git show --stat HEAD et git status pour contrôler le résultat.",
    ],
    quiz: {
      question: "Quelle commande permet de voir ce qui a été ajouté au staging avant le commit ?",
      options: ["git diff --staged", "git log --all", "git status --ignored", "git init"],
      answerIndex: 0,
      explanation: "git diff --staged compare la zone de préparation au dernier commit : c’est précisément le contenu prévu pour le prochain commit.",
    },
  },
  {
    slug: "erreurs-frequentes",
    title: "Erreurs fréquentes et cas limites",
    summary: "Repérer les bugs C classiques et apprendre à les prévenir par des vérifications ciblées.",
    group: "Tests et qualité",
    resources: [
      {
        title: "C Secure Coding Rules",
        description: "Recommandations de codage sûr et erreurs fréquentes en C.",
        source: "SEI CERT",
        url: "https://wiki.sei.cmu.edu/confluence/display/c/SEI+CERT+C+Coding+Standard",
      },
      {
        title: "AddressSanitizer",
        description: "Détecter des accès mémoire invalides à l’exécution.",
        source: "LLVM Clang",
        url: "https://clang.llvm.org/docs/AddressSanitizer.html",
      },
    ],
    sections: [
      {
        title: "Indices et tailles",
        paragraphs: [
          "Un tableau de taille n a des indices valides de 0 à n - 1. Une boucle qui utilise i <= n lit une case de trop ; préfère i < n et transmets la taille avec le tableau.",
          "Avant de calculer une taille d’allocation, pense aux débordements dans n * sizeof *items. Vérifie aussi que l’entrée n’est pas négative avant de la convertir vers size_t.",
          "Une chaîne a besoin d’une case pour son terminateur '\0'. Écrire exactement la longueur visible sans réserver cette case crée une chaîne invalide qui peut provoquer une lecture hors limites.",
        ],
        code: `for (size_t i = 0; i < count; i++) {
    printf("%d\\n", values[i]);
}`,
        codeExplanation: "L’indice reste strictement inférieur à count. La dernière valeur lue est values[count - 1] ; quand count vaut zéro, le corps n’est pas exécuté.",
      },
      {
        title: "Valeurs non initialisées et pointeurs",
        paragraphs: [
          "Initialise les variables locales et les pointeurs avant utilisation. Un pointeur doit soit viser un objet vivant, soit valoir NULL tant qu’il n’est pas prêt.",
          "Teste le résultat de malloc avant d’accéder au bloc. Après free, n’utilise plus le pointeur ; une seconde libération ou un accès après libération peut corrompre le programme.",
          "Ne suppose pas qu’une fonction a réussi : examine ses valeurs de retour, vérifie les descripteurs et teste les entrées vides ou invalides.",
        ],
        code: `int *values = malloc(count * sizeof *values);
if (values == NULL) {
    return 1;
}

values[0] = 42;
free(values);
values = NULL;`,
        codeExplanation: "L’allocation est contrôlée avant l’accès. Attention : si count vaut zéro, values[0] ne doit pas être utilisé ; le code complet doit aussi traiter ce cas selon son contrat.",
        note: "Vérifier NULL ne suffit pas si le nombre d’éléments vaut zéro ou si la multiplication de la taille déborde. Valide chaque précondition avant l’accès.",
      },
      {
        title: "Formats, conditions et ordre des opérations",
        paragraphs: [
          "Chaque format de printf doit correspondre exactement au type passé. Utiliser %d pour un pointeur ou %s pour un int n’est pas une simple erreur d’affichage : le comportement est indéfini.",
          "Dans une condition, == compare et = affecte. Une confusion peut modifier l’état du programme tout en produisant une condition inattendue ; active les avertissements et relis les expressions.",
          "La division entière tronque ; diviser par zéro est invalide. Vérifie le dénominateur et utilise des opérandes flottants lorsque le résultat doit conserver des décimales.",
          "Découpe une expression complexe en variables intermédiaires nommées. Cela rend l’ordre des calculs explicite et simplifie l’inspection au débogueur.",
        ],
        code: `int score = 42;
if (score == 42) {
    printf("Score : %d\\n", score);
}`,
        codeExplanation: "La double égalité compare score à 42 sans modifier score. Le spécificateur %d correspond au type int ; les accolades rendent le bloc clair.",
      },
      {
        title: "Construire une petite matrice de tests",
        paragraphs: [
          "Pour chaque fonction, teste au moins le cas nominal, la plus petite entrée, une entrée vide ou nulle si elle est permise, et une limite liée au contrat.",
          "Quand le résultat est faux, reproduis le cas précis puis réduis-le. Ajoute-le à tes tests automatisés une fois le bug corrigé pour éviter sa réapparition.",
          "Les outils mémoire détectent certains accès invalides ; les tests unitaires vérifient les résultats attendus. Utilise les deux approches, car aucune ne couvre seule tous les défauts.",
        ],
        code: `/* Cas à prévoir pour une fonction de chaîne */
""          /* chaîne vide */
"a"         /* un caractère */
"abc"       /* cas nominal */
"ab" / "abc" /* tailles différentes */`,
        codeExplanation: "Cette matrice couvre la chaîne vide, un élément, un cas habituel et des longueurs différentes. Complète-la selon la fonction testée et son contrat.",
      },
    ],
    exercise: "Prends une fonction de chaîne ou de tableau déjà écrite. Construis une liste d’au moins six entrées limites, écris des tests pour chacune et lance-la sous un sanitizer.",
    exerciseHints: [
      "Inclue un tableau de taille zéro si le contrat l’autorise, puis un tableau de taille un.",
      "Pour une chaîne, teste vide, un caractère, égalité exacte, différence au premier caractère et une chaîne préfixe de l’autre.",
      "Ajoute le sanitizer à la compilation et vérifie autant les résultats que l’absence d’accès invalide.",
    ],
    quiz: {
      question: "Quel est le dernier indice valide d’un tableau de taille n, si n est supérieur à zéro ?",
      options: ["n", "n - 1", "1", "n + 1"],
      answerIndex: 1,
      explanation: "L’indexation commence à zéro ; n éléments occupent donc les indices 0 à n - 1.",
    },
  },
  {
    slug: "mini-projet",
    title: "Mini-projet : carnet de scores",
    summary: "Assembler fonctions, structures, arguments, allocation, Makefile et tests.",
    group: "Projets guidés",
    resources: [
      {
        title: "Criterion — Setup",
        description: "Compiler un exécutable de tests avec Criterion.",
        source: "Criterion",
        url: "https://criterion.readthedocs.io/en/master/setup.html",
      },
      {
        title: "GNU Make Manual",
        description: "Comprendre les cibles et dépendances du Makefile du projet.",
        source: "GNU",
        url: "https://www.gnu.org/software/make/manual/make.html",
      },
    ],
    sections: [
      {
        title: "Objectif et contraintes",
        paragraphs: [
          "Construis un petit programme en ligne de commande qui reçoit des scores entiers, les valide, calcule leur moyenne et affiche la valeur minimale et maximale. Le but est de réutiliser les notions du parcours dans un projet cohérent.",
          "Le programme doit refuser l’absence de scores, une conversion invalide et un dépassement de capacité. Définis clairement si les nombres négatifs sont acceptés ; applique la même règle au parseur et aux tests.",
          "Sépare le parsing des arguments, les calculs métier et l’affichage. Une fonction doit avoir une responsabilité claire et une interface testable sans lancer le programme complet.",
          "N’intègre aucune dépendance ni convention de rendu sans vérifier ton sujet de Piscine. Si Criterion n’est pas disponible, écris un petit exécutable de test autonome en suivant les consignes du projet.",
        ],
        code: `typedef struct score_summary {
    size_t count;
    long total;
    int minimum;
    int maximum;
} score_summary_t;

int parse_score(char const *text, int *score);
int add_score(score_summary_t *summary, int score);
double get_average(score_summary_t const *summary);`,
        codeExplanation: "La structure regroupe des données qui décrivent toutes le résumé de scores. parse_score convertit une entrée validée, add_score met à jour le résumé et get_average calcule une valeur sans modifier la structure.",
      },
      {
        title: "Étape 1 — définir l’interface",
        paragraphs: [
          "Crée un dossier avec src/, include/ et tests/. Place les prototypes et la structure partagée dans un en-tête protégé ; garde les définitions dans les fichiers .c.",
          "Choisis les types selon les plages attendues. size_t convient au nombre d’éléments, tandis que total doit pouvoir contenir la somme maximale prévue par le contrat.",
          "Définis le comportement en cas d’erreur : valeur de retour, sortie sur stderr, code de retour de main et responsabilité de libérer une allocation.",
        ],
        code: `include/score.h
src/main.c
src/parse_score.c
src/score_summary.c
tests/test_score.c
Makefile`,
        codeExplanation: "La séparation rend les responsabilités visibles. Les noms sont indicatifs : respecte les conventions de nommage et le format exact du projet demandé par ta Piscine.",
      },
      {
        title: "Étape 2 — implémenter les calculs",
        paragraphs: [
          "Écris d’abord les fonctions pures ou presque pures : convertir une chaîne en score, mettre à jour le résumé et calculer la moyenne. Une fonction de calcul se teste plus facilement si elle ne lit pas stdin et n’écrit pas directement à l’écran.",
          "Pour convertir un entier en texte, strtol permet de détecter les caractères restants, l’absence de chiffres et le dépassement. Vérifie l’argument nul, endptr et errno selon le contrat.",
          "Traite le premier score séparément pour initialiser minimum et maximum, ou ajoute un indicateur d’état explicite. Ne lis pas ces champs tant que le résumé ne contient aucun score.",
          "Vérifie les débordements de total avant l’addition si les entrées peuvent atteindre les limites du type choisi. Le contrat doit définir ce qui se passe quand une valeur ne peut pas être représentée.",
        ],
        code: `int add_score(score_summary_t *summary, int score)
{
    if (summary == NULL) {
        return 1;
    }
    if (summary->count == 0) {
        summary->minimum = score;
        summary->maximum = score;
    }
    return 0;
}`,
        codeExplanation: "Ce squelette valide le pointeur et initialise les bornes au premier élément. Complète-le en mettant aussi à jour total et count, puis en comparant le score aux bornes existantes.",
      },
      {
        title: "Étape 3 — tester les cas importants",
        paragraphs: [
          "Teste le parseur avec un entier valide, un signe, une chaîne vide, des lettres après les chiffres et une valeur hors plage. Chaque cas doit avoir un résultat défini.",
          "Teste le résumé avec un seul score, plusieurs scores, des valeurs identiques, un nouveau minimum et un nouveau maximum. Une moyenne teste aussi la conversion vers un type flottant.",
          "Ajoute un test de comportement invalide : pointeur nul ou résumé vide, selon ce que chaque fonction accepte. L’attendu doit être formulé à partir du contrat.",
          "Lance les tests unitaires et le programme complet ; ils vérifient des niveaux différents. En cas d’échec, garde l’entrée minimale qui reproduit le problème.",
        ],
        code: `Test(score_summary, tracks_min_and_max)
{
    score_summary_t summary = {0};

    cr_assert_eq(add_score(&summary, 12), 0);
    cr_assert_eq(add_score(&summary, 7), 0);
    cr_assert_eq(summary.minimum, 7);
    cr_assert_eq(summary.maximum, 12);
}`,
        codeExplanation: "Le test part d’un résumé vide et ajoute deux valeurs dans un ordre connu. Il vérifie les bornes après les insertions ; ajoute également des assertions sur count, total et le résultat de la moyenne.",
      },
      {
        title: "Étape 4 — compiler, contrôler et livrer",
        paragraphs: [
          "Ajoute dans le Makefile une cible par défaut pour le programme, une cible test séparée et des règles de nettoyage conformes au sujet. Déclare les dépendances des fichiers objets afin que make recompile ce qui a changé.",
          "Compile avec les avertissements imposés, lance les tests puis un sanitizer. Vérifie le code de retour, les arguments invalides, les chaînes vides et les limites numériques.",
          "Relis le coding style, inspecte git status et le diff, et vérifie que le dépôt contient uniquement les fichiers nécessaires. Ne livre pas de binaire compilé si le sujet ne le demande pas.",
          "Le mini-projet est réussi lorsque le comportement est défini, chaque fonction importante est testée et une personne peut compiler puis exécuter le projet en suivant le README ou le sujet.",
        ],
        code: `make
make test
./score_summary 12 7 15
git status --short`,
        codeExplanation: "Les cibles make dépendent du Makefile effectivement fourni par le projet. La ligne ./score_summary illustre une invocation possible : adapte son nom et son format aux choix décrits dans ton interface.",
      },
    ],
    exercise: "Implémente entièrement le carnet de scores : parsing robuste, minimum, maximum, somme, moyenne, Makefile, tests et messages d’erreur.",
    exerciseHints: [
      "Commence par écrire le contrat de parse_score et add_score, puis teste chaque fonction avant de construire main.",
      "Utilise strtol avec endptr pour rejeter une chaîne vide ou des caractères résiduels. Vérifie que le résultat tient dans int avant la conversion.",
      "Écris les tests Criterion ou un testeur autonome pour l’état initial, un élément, plusieurs éléments, les erreurs de parsing et les limites du type.",
    ],
    quiz: {
      question: "Pourquoi tester add_score séparément de main ?",
      options: [
        "Pour éviter d’avoir à compiler le programme",
        "Pour vérifier la logique directement sans dépendre du parsing et de l’affichage",
        "Parce qu’une fonction C ne peut pas être appelée depuis main",
        "Pour faire disparaître les avertissements du compilateur",
      ],
      answerIndex: 1,
      explanation: "Des unités séparées rendent les tests ciblés et permettent de distinguer un bug de calcul d’un problème d’arguments ou d’affichage.",
    },
  },
];

export const lessonGroups = [...new Set(lessons.map((lesson) => lesson.group))];

export function getLesson(slug: string) {
  return lessons.find((lesson) => lesson.slug === slug);
}
