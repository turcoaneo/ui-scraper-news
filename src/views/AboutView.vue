<script setup>
// No logic needed for now
</script>

<template>
  <div class="about">
    <h1>Topul știrilor zilnice de sport din online</h1>
    <h2>
      O selecție a știrilor de sport din principalele siteuri online de specialitate:
    </h2>
    <ul class="list">
      <li>GSP</li>
      <li>Digisport</li>
      <li>Fanatik</li>
      <li>Prosport</li>
    </ul>
    <div class="info">
      Topul este calculat prin identificarea știrilor similare verificând cuvinte cheie
      <br/>
      (pe baza unui model (”dumitrescustefan”) LLM - BERT cu specific românesc, adaptat din HuggingFace).
      <br/>
      Butonul de Filtrează din pagina ”Acasă” permite filtrare prin includere și/sau excludere de cuvinte.
      <br/>
      ”Becali” este exclus de server și această opțiune nu poate fi editată de utilizator.
    </div>
  </div>
</template>

<style scoped>
.list {
  color: #00bd7e;
}
.info {
  margin-left: 0.5rem;
  margin-top: 0.5rem;
  color: #266d4d;
  font-size: 0.75rem;
}
</style>
