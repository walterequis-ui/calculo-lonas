// Formatear números a dos decimales, eliminando decimales innecesarios
function formatearNumero(num) {
    return Number.parseFloat(num).toFixed(2);
}

// Calcular el precio
function calcularPrecio() {
    // Obtener valores de entrada
    const costoPorMetro = parseFloat(document.getElementById('costo').value);
    const metros = parseFloat(document.getElementById('metros').value);
    
    // Validar entradas
    if (isNaN(costoPorMetro) || isNaN(metros) || costoPorMetro <= 0 || metros <= 0) {
        document.getElementById('costo-total').textContent = '$0.00';
        document.getElementById('precio-venta').textContent = '$0.00';
        document.getElementById('ganancia').textContent = '$0.00';
        document.getElementById('margen').textContent = '0%';
        document.getElementById('desglose').innerHTML = '<div class="no-data">Por favor, ingrese valores válidos en ambos campos.</div>';
        return;
    }
    
    // Calcular costo total
    const costoTotal = costoPorMetro * metros;
    
    // Variables para el desglose
    let primerMetro = 0;
    let segundoTercerMetro = 0;
    let metrosRestantes = 0;
    let precioVenta = 0;
    
    // Calcular precio de venta según las reglas
    if (metros > 0) {
        // Primer metro o fracción
        primerMetro = Math.min(metros, 1);
        precioVenta += primerMetro * costoPorMetro * 2.5;
        
        if (metros > 1) {
            // Segundo y tercer metro o fracción
            segundoTercerMetro = Math.min(metros - 1, 2);
            precioVenta += segundoTercerMetro * costoPorMetro * 2;
            
            if (metros > 3) {
                // Metros restantes
                metrosRestantes = metros - 3;
                precioVenta += metrosRestantes * costoPorMetro * 1.6;
            }
        }
    }
    
    // Calcular ganancia
    const ganancia = precioVenta - costoTotal;
    
    // Calcular margen de ganancia
    const margen = costoTotal > 0 ? (ganancia / costoTotal) * 100 : 0;
    
    // Mostrar resultados
    document.getElementById('costo-total').textContent = '$' + formatearNumero(costoTotal);
    document.getElementById('precio-venta').textContent = '$' + formatearNumero(precioVenta);
    document.getElementById('ganancia').textContent = '$' + formatearNumero(ganancia);
    document.getElementById('margen').textContent = formatearNumero(margen) + '%';
    
    // Generar desglose
    let desgloseHTML = '';
    
    if (primerMetro > 0) {
        const valor = primerMetro * costoPorMetro * 2.5;
        desgloseHTML += `
            <div class="breakdown-item">
                <div class="breakdown-desc">${formatearNumero(primerMetro)} m (primer metro) × $${formatearNumero(costoPorMetro)} × 2.5</div>
                <div class="breakdown-value">$${formatearNumero(valor)}</div>
            </div>
        `;
    }
    
    if (segundoTercerMetro > 0) {
        const valor = segundoTercerMetro * costoPorMetro * 2;
        desgloseHTML += `
            <div class="breakdown-item">
                <div class="breakdown-desc">${formatearNumero(segundoTercerMetro)} m (segundo/tercer metro) × $${formatearNumero(costoPorMetro)} × 2.0</div>
                <div class="breakdown-value">$${formatearNumero(valor)}</div>
            </div>
        `;
    }
    
    if (metrosRestantes > 0) {
        const valor = metrosRestantes * costoPorMetro * 1.6;
        desgloseHTML += `
            <div class="breakdown-item">
                <div class="breakdown-desc">${formatearNumero(metrosRestantes)} m (metros restantes) × $${formatearNumero(costoPorMetro)} × 1.6</div>
                <div class="breakdown-value">$${formatearNumero(valor)}</div>
            </div>
        `;
    }
    
    // Total
    desgloseHTML += `
        <div class="breakdown-item">
            <div class="breakdown-desc">TOTAL PRECIO DE VENTA</div>
            <div class="breakdown-value">$${formatearNumero(precioVenta)}</div>
        </div>
    `;
    
    document.getElementById('desglose').innerHTML = desgloseHTML;
}

// Configurar event listeners después de que el DOM esté cargado
document.addEventListener('DOMContentLoaded', function() {
    // Botón de calcular
    document.getElementById('calcular-btn').addEventListener('click', calcularPrecio);
    
    // Calcular al presionar Enter en cualquier campo
    document.getElementById('costo').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') calcularPrecio();
    });
    
    document.getElementById('metros').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') calcularPrecio();
    });
});