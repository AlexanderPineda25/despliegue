import { Routes } from '@angular/router';
import { AuthGuard } from './_auth/auth.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LibraryComponent } from './library/library.component';
import { ProjectClassroomComponent } from './project-classroom/project-classroom.component';
import { ProjectPedagogicalComponent } from './project-pedagogical/project-pedagogical.component';
import { ProjectProductiveComponent } from './project-productive/project-productive.component';
import { SchoolMarketComponent } from './school-market/school-market.component';
import { SchoolNewspaperComponent } from './school-newspaper/school-newspaper.component';
import { VirtualRealityGamesComponent } from './virtual-reality-games/virtual-reality-games.component';
import { AgendaMeetingsComponent } from './agenda-meetings/agenda-meetings.component';
import { CreateBookComponent } from './create-book/create-book.component';
import { CreateProjectComponent } from './create-project/create-project.component';
import { ProjectsComponent } from './projects/projects.component';
import { CreateNewspaperComponent } from './create-newspaper/create-newspaper.component';

import { MisionVisionComponent } from './statics/mision-vision/mision-vision.component';
import { SymbolsComponent } from './statics/symbols/symbols.component';
import { PrinciplesAndValuesComponent } from './statics/principles-and-values/principles-and-values.component';
import { SedesComponent } from './statics/sedes/sedes.component';
import { CoexistenceManualComponent } from './statics/coexistence-manual/coexistence-manual.component';
import { StudyPlanComponent } from './statics/study-plan/study-plan.component';
import { ResolutionsComponent } from './statics/resolutions/resolutions.component';
import { CommuniquesComponent } from './statics/communiques/communiques.component';
import { CommunityComponent } from './statics/community/community.component';
import { TransparencyComponent } from './statics/transparency/transparency.component';
import { ConvocatoryComponent } from './statics/convocatory/convocatory.component';
import { PEIComponent } from './statics/pei/pei.component';
import { AccountabilityComponent } from './statics/accountability/accountability.component';
import { ContractingComponent } from './statics/contracting/contracting.component';
import { PegrComponent } from './projectsPedagogical/pegr/pegr.component';
import { PesccComponent } from './projectsPedagogical/pescc/pescc.component';
import { SchoolGovernanceComponent } from './projectsPedagogical/school-governance/school-governance.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'library', component: LibraryComponent },
    { path: 'misionVision', component: MisionVisionComponent },
    { path: 'symbols', component: SymbolsComponent },
    { path: 'principlesAndValues', component: PrinciplesAndValuesComponent },
    { path: 'sedes', component: SedesComponent },
    { path: 'coexistenceManual', component: CoexistenceManualComponent },
    { path: 'studyPlan', component: StudyPlanComponent },
    { path: 'resolutions', component: ResolutionsComponent },
    { path: 'communiques', component: CommuniquesComponent },
    { path: 'community', component: CommunityComponent },
    { path: 'projectClassroom', component: ProjectClassroomComponent },
    { path: 'projectPedagogical', component: ProjectPedagogicalComponent },
    { path: 'projectProductive', component: ProjectProductiveComponent },
    { path: 'schoolMarket', component: SchoolMarketComponent },
    { path: 'schoolNewspaper', component: SchoolNewspaperComponent },
    { path: 'virtualRealityGames', component: VirtualRealityGamesComponent },
    { path: 'agendaMeetings', component: AgendaMeetingsComponent },
    { path: 'transparency', component: TransparencyComponent },
    { path: 'convocatory', component: ConvocatoryComponent },
    { path: 'createBook/new', component: CreateBookComponent },
    { path: 'createBook/:id', component: CreateBookComponent },
    { path: 'createProject/new', component: CreateProjectComponent },
    { path: 'createProject/:id', component: CreateProjectComponent },
    { path: 'projects', component: ProjectsComponent },
    { path: 'projects/:type', component: ProjectsComponent },
    { path: 'pei', component: PEIComponent },
    { path: 'accountability', component: AccountabilityComponent },
    { path: 'contracting', component: ContractingComponent },
    { path: 'pegr', component: PegrComponent },
    { path: 'pescc', component: PesccComponent },
    { path: 'schoolGovernance', component: SchoolGovernanceComponent },
    { path: 'createNewspaper/new', component: CreateNewspaperComponent },
    { path: 'createNewspaper/:id', component: CreateNewspaperComponent },
];
