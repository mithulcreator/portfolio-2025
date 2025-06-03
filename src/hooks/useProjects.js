import { useEffect, useState } from 'react'
import { client } from '../sanityClient'

export function useProjects() {
  const [projects, setProjects] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const query = `*[_type == "project"] | order(_createdAt desc) {
          _id,
          title,
          slug,
          role,
          tools,
          timeline,
          type,
          cover,
          gallery,
          client,
          problem,
          process,
          solution,
          outcome,
          learned,
          video
        }`
        
        console.log('Fetching projects...')
        const data = await client.fetch(query)
        console.log('Projects fetched:', data)
        setProjects(data)
      } catch (err) {
        console.error('Error fetching projects:', err)
        setError(err)
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  return { projects, error, loading }
}