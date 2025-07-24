## Capostone Project di Alessandro Di Giannantonio

---

# Personal Budget Manager – Web App per la gestione delle finanze personali

Il progetto consiste in una web application per la gestione delle finanze personali, pensata per offrire agli
utenti uno strumento semplice ma completo per il monitoraggio delle proprie entrate e spese.

L’obiettivo è fornire un'interfaccia intuitiva che permetta agli utenti di tenere traccia del proprio bilancio mensile,
suddividere le transazioni per categoria, e visualizzare report e grafici sull'andamento economico.

La dashboard dell’app fornirà una panoramica interattiva e aggiornata del saldo disponibile, delle spese totali per
categoria, e dell’andamento nel tempo. Saranno presenti anche filtri per mese e tipologia di
transazione.

L'applicazione è sviluppata in React per il frontend, con Spring Boot e PostgreSQL per il backend, utilizzando Spring
Security per la gestione dell’autenticazione e delle autorizzazioni. L’obiettivo del progetto è creare un'applicazione
realmente utile nella vita quotidiana, valorizzando le competenze acquisite in ambito full-stack durante il percorso
formativo.

---

# Spiegazione avvio/uso dell'app:

Dopo aver avviato il backend presente nella repository: https://github.com/Alessandro0418/Capstone-Project-Backend e dopo aver avviato il frontend tramite npm run dev, la prima pagina che si aprirà sarà la Home Page, qui ci sarà la possibilità di Registrarsi oppure di Accedere se si ha già un account.

Nel caso della registrazione, verranno richiesti:
Nome, cognome, email, username, password ed infine il link per un avatar (opzionale), una volta che si compila il tutto e si clicca su "Register" l'account verrà creato e si potrà quindi fare l'accesso.

Nel login vengono richiesti solamente:
Username e password, una volta compilato il tutto, cliccando su Log In si verrà indirizzati alla propria area personale, non che il cuore dell'app, ovvero la Dashboard.

---

All'interno della Dashobard che come detto è il cuore dell'app, troviamo:
La possibilità di selezionare mese ed anno

- Il saldo corrente

- Un riepilogo delle spese e delle entrate con possibilità di eliminare le singole transazioni

- Un calendario che mostra evidenziando in verde i giorni in cui ci sono state entrate e in rosso i giorni in cui ci sono state spese, e nel caso in cui nello stesso giorno ci sono sia entrate che uscite, verrà evidenziato sia in verte che in rosso.

- Una sezione che mostra le ultime 5 transazioni

- Tasto per aggiugnere una transazione (per aggiungere una transazione bisogna prima creare una categoria)

- Tasto per creare una categoria

- Riepilogo di tutte le categoria esistenti con possibilità di eliminare le categorie (verrà impedita l'eliminazione di uan categoria nel caso in cui la categoria che stiamo cercando di eliminare sia legata ad una transazione, in quel caso verremo avviasati con un messaggio, che ci chiederà di eliminare prima la transazione di riferimento)

- Settings (Icona dell'ingranaggio)
  All'interno dei settings troviamo le user Info, con l'immagine dell'avatar scelto dall'utente, il nome, il cognome, l'email e l'username.

- La possibilità di switchare fra dark mode e light mode (la modifica tra dark mode e light mode si applica solo alla dashboard in quanto la dashboard è l'area personale dell'utente)

- Tasto Logout che disconnette l'utente e riporta alla Home Page

---

# LINKS:

Repository GitHub Backend --> https://github.com/Alessandro0418/Capstone-Project-Backend
Repository GitHub Frontend --> https://github.com/Alessandro0418/Capostone-Project

---
