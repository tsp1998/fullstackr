import { ArtifactData } from '../@types/artifact.types';

const userData: ArtifactData = {
  name: 'user',
  itemRoutes: ['get', 'post', 'patch', 'delete'],
  listRoutes: ['get'],
  schema: { name: { type: String, required: true }, }
}

export default userData;