import {
    ChangeDetectionStrategy,
    Component,
    Input,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Planet } from '../../repository/planet';
import { PlanetThumbnailComponent } from '../planet-thumbnail/planet-thumbnail.component';

@Component({
  selector: 'app-planet-card',
  standalone: true,
    imports: [MatCardModule, PlanetThumbnailComponent],
  templateUrl: './planet-card.component.html',
  styleUrl: './planet-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlanetCardComponent {
    
    @Input()
    public planet!: Planet;
    
}
