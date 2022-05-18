import createRouter, { RouteDataModel, RoutesMapModel } from './createRouter'
import createModel from '../models/createModel'
import { ArtifactData } from '../../common/@types/artifact.types'
import { Router } from 'express'

const routersGenerator = (artifactData: ArtifactData) => {
  const Model = createModel(artifactData.name, artifactData.schema)
  const routers: Array<{ path: string; router: Router }> = [
    ...(artifactData.itemRoutes.length ? [{
      path: `/${artifactData.name}`,
      router: createRouter(artifactData.itemRoutes!.reduce((acc: RoutesMapModel, key): RoutesMapModel => ({
        ...acc,
        [key === 'post' ? '/' : `/:${artifactData.name}Id-${key}`]: {
          controllerData: { StorageClass: Model },
          idParamName: `${artifactData.name}Id`
        } as RouteDataModel
      }), {}))
    }]: []),
    ...(artifactData.listRoutes.length ? [{
      path: `/${artifactData.name}s`,
      router: createRouter(artifactData.listRoutes!.reduce((acc: RoutesMapModel, key): RoutesMapModel => ({
        ...acc,
        [`/-${key}`]: { controllerData: { StorageClass: Model, dataType: 'list' } } as RouteDataModel
      }), {}))
    }]: []),
  ]
  return routers;
}

export default routersGenerator;