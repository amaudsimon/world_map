import { Component, OnInit } from '@angular/core';
import { CountryService } from './country.service';
import { CountryInfo } from './country.model';

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.css'],
  providers: [CountryService]
})
export class MapViewComponent implements OnInit {
  countryInfo: CountryInfo | undefined;

  constructor(private countryService: CountryService) {}

  ngOnInit() {
    const paths = document.querySelectorAll('path');

    paths.forEach((path) => {
      const countryCode = path.getAttribute('id');

      path.addEventListener('mouseover', () => {
        path.style.fill = 'yellow';
        if (countryCode) {
          this.handleMouseOver(countryCode);
        }
      });

      path.addEventListener('mouseout', () => {
        path.style.fill = '';
        this.handleMouseOut();
      });
    });
  }

  fetchCountryInformation(countryName: string) {
    this.countryService.getCountryInformation(countryName)
      .subscribe((response: any) => {
        console.log(response);
        this.countryInfo = {
          name: response[1][0].name,
          capitalCity: response[1][0].capitalCity,
          region: response[1][0].region.value,
          incomeLevel: response[1][0].incomeLevel.value,
          longitude: response[1][0].longitude,
          latitude: response[1][0].latitude
        };
        console.log(this.countryInfo);
      });
  }

  handleMouseOver(countryCode: string) {
    this.fetchCountryInformation(countryCode);
  }

  handleMouseOut() {
    this.countryInfo = undefined;
  }
}