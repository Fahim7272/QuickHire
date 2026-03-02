<?php

namespace Database\Seeders;

use App\Models\JobListing;
use Illuminate\Database\Seeder;

class JobSeeder extends Seeder
{
    public function run(): void
    {
        $jobs = [
            [
                'title' => 'Email Marketing',
                'company' => 'Revolut',
                'company_logo' => 'https://logo.clearbit.com/revolut.com',
                'location' => 'Madrid, Spain',
                'category' => 'Marketing',
                'type' => 'Full Time',
                'description' => 'Revolut is looking for Email Marketing specialist to help the team manage and grow our email campaigns. You will create and optimize email marketing strategies for our global customer base.',
            ],
            [
                'title' => 'Brand Designer',
                'company' => 'Dropbox',
                'company_logo' => 'https://logo.clearbit.com/dropbox.com',
                'location' => 'San Francisco, US',
                'category' => 'Design',
                'type' => 'Full Time',
                'description' => 'Dropbox is looking for a Brand Designer to help the team craft our visual identity. You will work on brand guidelines, marketing materials, and product design direction.',
            ],
            [
                'title' => 'Email Marketing',
                'company' => 'Pitch',
                'company_logo' => null,
                'location' => 'Berlin, Germany',
                'category' => 'Marketing',
                'type' => 'Full Time',
                'description' => 'Pitch is looking for a Customer Manager to join the marketing team. You will manage email campaigns, analyze performance metrics, and drive engagement.',
            ],
            [
                'title' => 'Visual Designer',
                'company' => 'Blinklist',
                'company_logo' => null,
                'location' => 'Granada, Spain',
                'category' => 'Design',
                'type' => 'Full Time',
                'description' => 'Blinkist is looking for a Visual Designer to help the team design stunning interfaces and visual content that communicates our brand story.',
            ],
            [
                'title' => 'Product Designer',
                'company' => 'ClassPass',
                'company_logo' => null,
                'location' => 'Manchester, UK',
                'category' => 'Design',
                'type' => 'Full Time',
                'description' => 'ClassPass is looking for a Product Designer to help us build world-class user experiences for our fitness platform. You\'ll collaborate with product and engineering teams.',
            ],
            [
                'title' => 'Lead Designer',
                'company' => 'Canva',
                'company_logo' => 'https://logo.clearbit.com/canva.com',
                'location' => 'Ontario, Canada',
                'category' => 'Design',
                'type' => 'Full Time',
                'description' => 'Canva is looking for a Lead Designer to help develop new visual experiences and lead a team of talented designers.',
            ],
            [
                'title' => 'Brand Strategist',
                'company' => 'GoDaddy',
                'company_logo' => 'https://logo.clearbit.com/godaddy.com',
                'location' => 'Marseille, France',
                'category' => 'Marketing',
                'type' => 'Full Time',
                'description' => 'GoDaddy is looking for a Brand Strategist to join the team and shape our global brand narrative. You will develop and execute brand strategies across multiple markets.',
            ],
            [
                'title' => 'Data Analyst',
                'company' => 'Twitter',
                'company_logo' => null,
                'location' => 'San Diego, US',
                'category' => 'Technology',
                'type' => 'Full Time',
                'description' => 'Twitter is looking for a Data Analyst to help our team make data-driven decisions. You will analyze large datasets and generate insights to improve our platform.',
            ],
            [
                'title' => 'Social Media Assistant',
                'company' => 'Nomad',
                'company_logo' => null,
                'location' => 'Paris, France',
                'category' => 'Marketing',
                'type' => 'Full-Time',
                'description' => 'Nomad is looking for a Social Media Assistant to help grow our brand presence across all platforms. You will create content, manage communities, and drive engagement.',
            ],
            [
                'title' => 'Social Media Assistant',
                'company' => 'Netlify',
                'company_logo' => 'https://logo.clearbit.com/netlify.com',
                'location' => 'Paris, France',
                'category' => 'Marketing',
                'type' => 'Full-Time',
                'description' => 'Netlify is looking for a Social Media Assistant to help grow their developer brand. You will manage social channels and create compelling technical content.',
            ],
            [
                'title' => 'Brand Designer',
                'company' => 'Maze',
                'company_logo' => null,
                'location' => 'San Francisco, USA',
                'category' => 'Design',
                'type' => 'Full-Time',
                'description' => 'Maze is looking for a Brand Designer to join their creative team and redefine how product teams communicate their design systems.',
            ],
            [
                'title' => 'Interactive Developer',
                'company' => 'Terraform',
                'company_logo' => null,
                'location' => 'Hamburg, Germany',
                'category' => 'Technology',
                'type' => 'Full-Time',
                'description' => 'Terraform is looking for an Interactive Developer to build amazing interactive experiences using cutting-edge web technologies.',
            ],
            [
                'title' => 'Interactive Developer',
                'company' => 'Udacity',
                'company_logo' => null,
                'location' => 'Hamburg, Germany',
                'category' => 'Technology',
                'type' => 'Full-Time',
                'description' => 'Udacity is looking for an Interactive Developer to create engaging e-learning experiences that help students master new tech skills.',
            ],
            [
                'title' => 'HR Manager',
                'company' => 'Packer',
                'company_logo' => null,
                'location' => 'Lucern, Switzerland',
                'category' => 'Human Resource',
                'type' => 'Full-Time',
                'description' => 'Packer is looking for an HR Manager to manage talent acquisition, employee relations, and performance management.',
            ],
            [
                'title' => 'HR Manager',
                'company' => 'Webflow',
                'company_logo' => 'https://logo.clearbit.com/webflow.com',
                'location' => 'Lucern, Switzerland',
                'category' => 'Human Resource',
                'type' => 'Full-Time',
                'description' => 'Webflow is looking for an HR Manager to help scale the people team and build a world-class culture at our company.',
            ],
        ];

        foreach ($jobs as $job) {
            JobListing::create($job);
        }
    }
}
