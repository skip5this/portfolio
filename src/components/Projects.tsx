import React from 'react';
const projects = [{
  id: 1,
  title: 'Strike',
  year: '2023',
  description: 'A minimal e-commerce website with a focus on user experience and performance.',
  image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHdlYnNpdGV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60',
  backgroundColor: 'bg-rose-50'
}, {
  id: 2,
  title: 'Fountain',
  year: '2023',
  description: 'A dashboard interface for monitoring and analyzing data in real-time.',
  image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGRhc2hib2FyZHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60',
  backgroundColor: 'bg-amber-50'
}, {
  id: 3,
  title: 'AIOZ Network',
  year: '2023-25',
  description: 'A mobile application designed to help users track their fitness goals.',
  image: 'https://images.unsplash.com/photo-1609921141835-710b7fa6e438?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8bW9iaWxlJTIwYXBwfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60',
  backgroundColor: 'bg-green-50'
}];
export function Projects() {
  return <section id="projects">
      <div className="w-full bg-green-50">
        <div className="max-w-7xl mx-auto px-4 py-20 min-h-[400px] flex flex-col justify-center">
          <h2 className="text-4xl font-bold mb-2">Recent works</h2>
          <div className="text-2xl">of Scott Bell</div>
        </div>
      </div>
      {projects.map(project => <div key={project.id} className={`w-full ${project.backgroundColor}`}>
          <div className="max-w-7xl mx-auto px-4 py-20">
            <div className="flex flex-col md:flex-row justify-between items-start mb-8">
              <h3 className="text-2xl font-medium">{project.title}</h3>
              <span className="text-gray-600 mt-2 md:mt-0">{project.year}</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map(index => <div key={index} className="aspect-[9/16] bg-white rounded-2xl overflow-hidden shadow-lg">
                  <img src={project.image} alt={`${project.title} screenshot ${index}`} className="w-full h-full object-cover" />
                </div>)}
            </div>
          </div>
        </div>)}
    </section>;
}