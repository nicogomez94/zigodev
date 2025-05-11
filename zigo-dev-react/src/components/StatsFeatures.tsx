import React from 'react';

const StatsFeatures: React.FC = () => {
    return (
        <section className="stats-features">
            <div className="container stats-grid">
                <div className="stat-card cost-card">
                    <h3><span className="card-icon green-circle"><i className="fas fa-check"></i></span> Soluciones Personalizadas</h3>
                    <h4>Eficiencia y resultados</h4>
                    <p>Optimiza tus recursos con servicios diseñados específicamente para las necesidades de tu negocio.</p>
                </div>
                <div className="stat-card percentage-card">
                    <div className="percentage">90%</div>
                    <div className="bar-chart-placeholder">
                        <span></span><span></span><span></span><span></span><span></span><span></span><span></span>
                    </div>
                    <p style={{ marginTop: '15px', textAlign: 'center', color: 'var(--text-medium)', fontSize: '0.9em' }}>Clientes satisfechos</p>
                </div>
                <div className="stat-card analytics-card">
                    <div className="card-header-icons">
                        <span className="avatar"></span>
                        <span className="avatar"></span>
                        <span className="avatar"></span>
                        <span className="avatar"></span>
                    </div>
                    <h4>Analítica y Estrategia</h4>
                    <p>Obtén datos clave y estrategias efectivas para tomar decisiones informadas y mejorar tu rendimiento.</p>
                </div>
            </div>
        </section>
    );
};

export default StatsFeatures;