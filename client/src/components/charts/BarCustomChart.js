
import { ResponsiveContainer, BarChart,Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
function BarCustomChart({data, title, labels}) {
    return (  <div className="section col-md-6">
    <h3 className="section-title">{title}</h3>
    <div className="section-content">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 15, right: 0, bottom: 15, left: 0 }}>
          <XAxis dataKey="label" />
          <YAxis />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <Tooltip />
          <Legend/>
          <Bar dataKey={labels[0]} fill="#FB8833" />
          <Bar dataKey={labels[1]} fill="#17A8F5" />
          <Bar dataKey={labels[2]} fill="#17A222" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  </div>);
}

export default BarCustomChart;