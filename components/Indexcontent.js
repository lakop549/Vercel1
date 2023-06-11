import React from "react";

export default function Indexcontent({ restaurant }) {
  return (
    <li>
      <a
        href={`/restaurant/${restaurant.REFINE_ZIPNO}`}
        class="block overflow-hidden group"
      >
        <img
          alt="Food_img"
          src={restaurant.IMG_URL}
          class="h-[350px] w-full object-cover transition duration-500 group-hover:scale-105 sm:h-[450px]"
        />

        <div class="relative pt-3 bg-white">
          <h3 class="text-xs text-gray-700 group-hover:underline group-hover:underline-offset-4">
            {restaurant.REPRSNT_FOOD_NM}
          </h3>

          <p class="mt-2">
            <span class="sr-only"> Regular Price </span>

            <span class="tracking-wider text-gray-900">
              {restaurant.RESTRT_NM}
            </span>
          </p>
        </div>
      </a>
    </li>
  );
}
