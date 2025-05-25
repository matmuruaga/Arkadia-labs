const BrevoForm = () => {
  return (
    <div className="w-full flex justify-center">
      <iframe
        width="100%"
        height= "600" // Ajustado para evitar scroll
        src="https://sibforms.com/serve/MUIFAOkL85i1rolyTU33uoJVxSnb6uDnORsZZoQbVAwQoj75Ubg8HfAWbUr_5PRx_Np-sgjFIWy31FKp5Qg8sfA1eWLfZLgKMaFAYD3YhxAZyE1Jdp5tlncQBiqQDVeb7Cg8cJ8ITw1wzBFDnu9IRPTqJmVveJuOdr0vWcG6JgSwVtcNCUIBOhfDlOKCacNAQXDuuG-z403pPcUt"
        scrolling="no"
        allowFullScreen
        style={{
          border: 'none',
          overflow: 'hidden',
          maxWidth: '100%',
        }}
        title="Formulario Brevo"
      />
    </div>
  );
};

export default BrevoForm;
