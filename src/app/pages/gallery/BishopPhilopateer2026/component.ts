import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-bishop-philopateer-2026',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './component.html',
  styleUrl: './component.scss'
})
export class BishopPhilopateer2026 {

  selectedImageIndex = signal<number | null>(null);

  title = "H.G. Bishop Philopateer's Visit (2026)";

  images: string[] = [
    'assets/gallery/BishopPhilopateer2026/DSC_2983.JPG',
    'assets/gallery/BishopPhilopateer2026/DSC_2984.JPG',
    'assets/gallery/BishopPhilopateer2026/DSC_2985.JPG',
    'assets/gallery/BishopPhilopateer2026/DSC_2987.JPG',
    'assets/gallery/BishopPhilopateer2026/DSC_2991.JPG',
    'assets/gallery/BishopPhilopateer2026/DSC_2993.JPG',
    'assets/gallery/BishopPhilopateer2026/DSC_2995.JPG',
    'assets/gallery/BishopPhilopateer2026/DSC_3001.JPG',
    'assets/gallery/BishopPhilopateer2026/DSC_3002.JPG',
    'assets/gallery/BishopPhilopateer2026/DSC_3003.JPG',
    'assets/gallery/BishopPhilopateer2026/DSC_3004.JPG',
    'assets/gallery/BishopPhilopateer2026/DSC_3005.JPG',
    'assets/gallery/BishopPhilopateer2026/DSC_3006.JPG',
    'assets/gallery/BishopPhilopateer2026/DSC_3009.JPG',
    'assets/gallery/BishopPhilopateer2026/DSC_3010.JPG',
    'assets/gallery/BishopPhilopateer2026/DSC_3011.JPG',
    'assets/gallery/BishopPhilopateer2026/DSC_3012.JPG',
    'assets/gallery/BishopPhilopateer2026/DSC_3014.JPG',
    'assets/gallery/BishopPhilopateer2026/DSC_3015.JPG',
    'assets/gallery/BishopPhilopateer2026/DSC_3016.JPG',
    'assets/gallery/BishopPhilopateer2026/DSC_3020.JPG',
    'assets/gallery/BishopPhilopateer2026/DSC_3022.JPG',
    'assets/gallery/BishopPhilopateer2026/DSC_3026.JPG',
    'assets/gallery/BishopPhilopateer2026/DSC_3028.JPG',
    'assets/gallery/BishopPhilopateer2026/DSC_3029.JPG',
    'assets/gallery/BishopPhilopateer2026/DSC_3030.JPG',
    'assets/gallery/BishopPhilopateer2026/DSC_3033.JPG',
    'assets/gallery/BishopPhilopateer2026/DSC_3035.JPG',
    'assets/gallery/BishopPhilopateer2026/DSC_3041.JPG',
    'assets/gallery/BishopPhilopateer2026/DSC_3042.JPG',
    'assets/gallery/BishopPhilopateer2026/DSC_3044.JPG',
    'assets/gallery/BishopPhilopateer2026/DSC_3047.JPG',
    'assets/gallery/BishopPhilopateer2026/DSC_3049.JPG',
    'assets/gallery/BishopPhilopateer2026/DSC_3052.JPG',
    'assets/gallery/BishopPhilopateer2026/DSC_3055.JPG',
    'assets/gallery/BishopPhilopateer2026/DSC_3057.JPG',
    'assets/gallery/BishopPhilopateer2026/DSC_3058.JPG',
    'assets/gallery/BishopPhilopateer2026/DSC_3060.JPG',
    'assets/gallery/BishopPhilopateer2026/DSC_3063.JPG',
    'assets/gallery/BishopPhilopateer2026/DSC_3064.JPG',
    'assets/gallery/BishopPhilopateer2026/DSC_3065.JPG',
    'assets/gallery/BishopPhilopateer2026/DSC_3068.JPG',
    'assets/gallery/BishopPhilopateer2026/DSC_3071.JPG',
    'assets/gallery/BishopPhilopateer2026/DSC_3075.JPG',
    'assets/gallery/BishopPhilopateer2026/DSC_3083.JPG',
    'assets/gallery/BishopPhilopateer2026/DSC_3095.JPG',
    'assets/gallery/BishopPhilopateer2026/DSC_3098.JPG',
    'assets/gallery/BishopPhilopateer2026/DSC_3101.JPG',
    'assets/gallery/BishopPhilopateer2026/DSC_3103.JPG',
    'assets/gallery/BishopPhilopateer2026/DSC_3107.JPG',
    'assets/gallery/BishopPhilopateer2026/DSC_3108.JPG',
    'assets/gallery/BishopPhilopateer2026/DSC_3109.JPG',
    'assets/gallery/BishopPhilopateer2026/DSC_3112.JPG',
    'assets/gallery/BishopPhilopateer2026/DSC_3113.JPG',
    'assets/gallery/BishopPhilopateer2026/DSC_3117.JPG',
    'assets/gallery/BishopPhilopateer2026/DSC_3119.JPG',
    'assets/gallery/BishopPhilopateer2026/DSC_3121.JPG',
    'assets/gallery/BishopPhilopateer2026/DSC_3125.JPG',
    'assets/gallery/BishopPhilopateer2026/DSC_3126.JPG',
    'assets/gallery/BishopPhilopateer2026/DSC_3127.JPG',
    'assets/gallery/BishopPhilopateer2026/DSC_3128.JPG',
    'assets/gallery/BishopPhilopateer2026/DSC_3131.JPG',
    'assets/gallery/BishopPhilopateer2026/DSC_3132.JPG',
    'assets/gallery/BishopPhilopateer2026/DSC_3143.JPG',
    'assets/gallery/BishopPhilopateer2026/DSC_3146.JPG',
    'assets/gallery/BishopPhilopateer2026/DSC_3148.JPG',
    'assets/gallery/BishopPhilopateer2026/DSC_3149.JPG',
    'assets/gallery/BishopPhilopateer2026/DSC_3150.JPG',
    'assets/gallery/BishopPhilopateer2026/DSC_3151.JPG', 
    'assets/gallery/BishopPhilopateer2026/DSC_3152.JPG',
    'assets/gallery/BishopPhilopateer2026/DSC_3155.JPG',
    'assets/gallery/BishopPhilopateer2026/DSC_3158.JPG',
    'assets/gallery/BishopPhilopateer2026/DSC_3162.JPG',
    'assets/gallery/BishopPhilopateer2026/DSC_3164.JPG',
    'assets/gallery/BishopPhilopateer2026/DSC_3165.JPG',
    'assets/gallery/BishopPhilopateer2026/DSC_3167.JPG',
    'assets/gallery/BishopPhilopateer2026/DSC_3168.JPG',
    'assets/gallery/BishopPhilopateer2026/DSC_3171.JPG',
    'assets/gallery/BishopPhilopateer2026/DSC_3172.JPG',
    'assets/gallery/BishopPhilopateer2026/DSC_3174.JPG',
    'assets/gallery/BishopPhilopateer2026/DSC_3179.JPG',
    'assets/gallery/BishopPhilopateer2026/DSC_3180.JPG',
    'assets/gallery/BishopPhilopateer2026/DSC_3182.JPG',
    'assets/gallery/BishopPhilopateer2026/DSC_3183.JPG',
    'assets/gallery/BishopPhilopateer2026/DSC_3186.JPG',
    'assets/gallery/BishopPhilopateer2026/DSC_3189.JPG',
    'assets/gallery/BishopPhilopateer2026/DSC_3190.JPG',
    'assets/gallery/BishopPhilopateer2026/DSC_3194.JPG',
    'assets/gallery/BishopPhilopateer2026/DSC_3197.JPG',
    'assets/gallery/BishopPhilopateer2026/DSC_3201.JPG',
    'assets/gallery/BishopPhilopateer2026/DSC_3206.JPG',
    'assets/gallery/BishopPhilopateer2026/DSC_3207.JPG',
    'assets/gallery/BishopPhilopateer2026/DSC_3209.JPG',
    'assets/gallery/BishopPhilopateer2026/DSC_3210.JPG',
    'assets/gallery/BishopPhilopateer2026/DSC_3211.JPG',
    'assets/gallery/BishopPhilopateer2026/DSC_3212.JPG',
    'assets/gallery/BishopPhilopateer2026/DSC_3218.JPG',
    'assets/gallery/BishopPhilopateer2026/DSC_3221.JPG',
    'assets/gallery/BishopPhilopateer2026/DSC_3222.JPG',
    'assets/gallery/BishopPhilopateer2026/DSC_3223.JPG',
    'assets/gallery/BishopPhilopateer2026/DSC_3225.JPG',
    'assets/gallery/BishopPhilopateer2026/DSC_3227.JPG',
    'assets/gallery/BishopPhilopateer2026/DSC_3229.JPG',
    'assets/gallery/BishopPhilopateer2026/DSC_3230.JPG',
    'assets/gallery/BishopPhilopateer2026/DSC_3232.JPG',
    'assets/gallery/BishopPhilopateer2026/DSC_3238.JPG',
    'assets/gallery/BishopPhilopateer2026/DSC_3239.JPG',
    'assets/gallery/BishopPhilopateer2026/DSC_3240.JPG',
    'assets/gallery/BishopPhilopateer2026/DSC_3242.JPG',
    'assets/gallery/BishopPhilopateer2026/DSC_3245.JPG',
    'assets/gallery/BishopPhilopateer2026/DSC_3246.JPG',
    'assets/gallery/BishopPhilopateer2026/DSC_3247.JPG',
    'assets/gallery/BishopPhilopateer2026/DSC_3253.JPG',
    'assets/gallery/BishopPhilopateer2026/DSC_3254.JPG',
    'assets/gallery/BishopPhilopateer2026/DSC_3258.JPG',
    'assets/gallery/BishopPhilopateer2026/DSC_3260.JPG',
    'assets/gallery/BishopPhilopateer2026/DSC_3261.JPG',
    'assets/gallery/BishopPhilopateer2026/DSC_3263.JPG',
    'assets/gallery/BishopPhilopateer2026/DSC_3264.JPG',
    'assets/gallery/BishopPhilopateer2026/DSC_3265.JPG',
    'assets/gallery/BishopPhilopateer2026/DSC_3267.JPG',
    'assets/gallery/BishopPhilopateer2026/DSC_3269.JPG',
    'assets/gallery/BishopPhilopateer2026/DSC_3278.JPG',
    'assets/gallery/BishopPhilopateer2026/DSC_3279.JPG',
    'assets/gallery/BishopPhilopateer2026/DSC_3282.JPG',
    'assets/gallery/BishopPhilopateer2026/DSC_3285.JPG',
    'assets/gallery/BishopPhilopateer2026/DSC_3287.JPG',
    'assets/gallery/BishopPhilopateer2026/DSC_3296.JPG',
    'assets/gallery/BishopPhilopateer2026/DSC_3303.JPG',
    'assets/gallery/BishopPhilopateer2026/DSC_3306.JPG',
    'assets/gallery/BishopPhilopateer2026/DSC_3308.JPG',
    'assets/gallery/BishopPhilopateer2026/DSC_3310.JPG',
    'assets/gallery/BishopPhilopateer2026/DSC_3312.JPG',
    'assets/gallery/BishopPhilopateer2026/DSC_3314.JPG',
    'assets/gallery/BishopPhilopateer2026/DSC_3316.JPG',
    'assets/gallery/BishopPhilopateer2026/DSC_3318.JPG',
    'assets/gallery/BishopPhilopateer2026/DSC_3319.JPG',
    'assets/gallery/BishopPhilopateer2026/DSC_3320.JPG',
    'assets/gallery/BishopPhilopateer2026/DSC_3321.JPG',
    'assets/gallery/BishopPhilopateer2026/DSC_3322.JPG',
    'assets/gallery/BishopPhilopateer2026/DSC_3323.JPG',
    'assets/gallery/BishopPhilopateer2026/DSC_3325.JPG',
    'assets/gallery/BishopPhilopateer2026/DSC_3326.JPG',
    'assets/gallery/BishopPhilopateer2026/DSC_3328.JPG',
    'assets/gallery/BishopPhilopateer2026/DSC_3330.JPG',
    'assets/gallery/BishopPhilopateer2026/DSC_3336.JPG',
    'assets/gallery/BishopPhilopateer2026/DSC_3339.JPG',
    'assets/gallery/BishopPhilopateer2026/DSC_3341.JPG',
    'assets/gallery/BishopPhilopateer2026/DSC_3345.JPG',
    'assets/gallery/BishopPhilopateer2026/DSC_3346.JPG',
    'assets/gallery/BishopPhilopateer2026/DSC_3347.JPG',
    'assets/gallery/BishopPhilopateer2026/DSC_3348.JPG',
    'assets/gallery/BishopPhilopateer2026/DSC_3349.JPG',
    'assets/gallery/BishopPhilopateer2026/DSC_3350.JPG',
    'assets/gallery/BishopPhilopateer2026/DSC_3352.JPG',
    'assets/gallery/BishopPhilopateer2026/DSC_3353.JPG',
    'assets/gallery/BishopPhilopateer2026/DSC_3354.JPG',
    'assets/gallery/BishopPhilopateer2026/DSC_3356.JPG',
    'assets/gallery/BishopPhilopateer2026/DSC_3359.JPG',
    'assets/gallery/BishopPhilopateer2026/DSC_3361.JPG',
    'assets/gallery/BishopPhilopateer2026/DSC_3368.JPG',
    'assets/gallery/BishopPhilopateer2026/DSC_3370.JPG',
    'assets/gallery/BishopPhilopateer2026/DSC_3371.JPG',
    'assets/gallery/BishopPhilopateer2026/DSC_3372.JPG',
    'assets/gallery/BishopPhilopateer2026/DSC_3373.JPG',
    'assets/gallery/BishopPhilopateer2026/DSC_3382.JPG',
    'assets/gallery/BishopPhilopateer2026/DSC_3388.JPG',
    'assets/gallery/BishopPhilopateer2026/DSC_3390 .jpg',
    'assets/gallery/BishopPhilopateer2026/DSC_3390.JPG',
    'assets/gallery/BishopPhilopateer2026/DSC_3397.JPG',
    'assets/gallery/BishopPhilopateer2026/DSC_3400.JPG',
    'assets/gallery/BishopPhilopateer2026/DSC_3408.JPG',
    'assets/gallery/BishopPhilopateer2026/DSC_3410.JPG',
    'assets/gallery/BishopPhilopateer2026/DSC_3412.JPG',
    'assets/gallery/BishopPhilopateer2026/DSC_3415.JPG',
    'assets/gallery/BishopPhilopateer2026/DSC_3416.JPG',
    'assets/gallery/BishopPhilopateer2026/DSC_3417.JPG',
    'assets/gallery/BishopPhilopateer2026/DSC_3427.JPG',
    'assets/gallery/BishopPhilopateer2026/DSC_3429.JPG',
    'assets/gallery/BishopPhilopateer2026/DSC_3430.JPG',
    'assets/gallery/BishopPhilopateer2026/DSC_3433.JPG',
    'assets/gallery/BishopPhilopateer2026/DSC_3434.JPG',
    'assets/gallery/BishopPhilopateer2026/DSC_3435.JPG',
    'assets/gallery/BishopPhilopateer2026/DSC_3437.JPG',
    'assets/gallery/BishopPhilopateer2026/DSC_3438.JPG',
    'assets/gallery/BishopPhilopateer2026/DSC_3442.JPG',
    'assets/gallery/BishopPhilopateer2026/DSC_3443.JPG',
    'assets/gallery/BishopPhilopateer2026/DSC_3446.JPG',
    'assets/gallery/BishopPhilopateer2026/DSC_3453.JPG',
    'assets/gallery/BishopPhilopateer2026/DSC_3454.JPG',
  ];

  openImage(index: number): void {
    this.selectedImageIndex.set(index);
  }

  closeImage(): void {
    this.selectedImageIndex.set(null);
  }

  previousImage(): void {
    const current = this.selectedImageIndex();

    if (current === null) {
      return;
    }

    const previous =
      current === 0
        ? this.images.length - 1
        : current - 1;

    this.selectedImageIndex.set(previous);
  }

  nextImage(): void {
    const current = this.selectedImageIndex();

    if (current === null) {
      return;
    }

    const next =
      current === this.images.length - 1
        ? 0
        : current + 1;

    this.selectedImageIndex.set(next);
  }
}
