<?php

namespace Database\Seeders;

use App\Models\JobListing;
use Illuminate\Database\Seeder;

class JobSeeder extends Seeder
{
    public function run(): void
    {
        $jobs = [
            // ── Design ──────────────────────────────────────────────
            ['title' => 'Brand Designer', 'company' => 'Dropbox', 'company_logo' => 'https://logo.clearbit.com/dropbox.com', 'location' => 'San Francisco, US', 'category' => 'Design', 'type' => 'Full Time', 'is_featured' => true, 'description' => 'Dropbox is looking for a Brand Designer to craft our visual identity across brand guidelines, marketing materials, and product design direction.'],
            ['title' => 'Visual Designer', 'company' => 'Canva', 'company_logo' => 'https://logo.clearbit.com/canva.com', 'location' => 'Ontario, Canada', 'category' => 'Design', 'type' => 'Full Time', 'is_featured' => false, 'description' => 'Canva is seeking a Visual Designer to shape stunning user-facing experiences and visual storytelling assets across our platform.'],
            ['title' => 'Product Designer', 'company' => 'Figma', 'company_logo' => 'https://logo.clearbit.com/figma.com', 'location' => 'New York, US', 'category' => 'Design', 'type' => 'Full Time', 'is_featured' => false, 'description' => 'Figma is hiring a Product Designer to help build world-class collaborative design tools used by millions of creators worldwide.'],
            ['title' => 'UX Designer', 'company' => 'Maze', 'company_logo' => 'https://logo.clearbit.com/maze.co', 'location' => 'San Francisco, US', 'category' => 'Design', 'type' => 'Full Time', 'is_featured' => false, 'description' => 'Maze is looking for a UX Designer to create engaging, user-centred experiences and define how product teams communicate their design systems.'],

            // ── Marketing ───────────────────────────────────────────
            ['title' => 'Email Marketing Manager', 'company' => 'Revolut', 'company_logo' => 'https://logo.clearbit.com/revolut.com', 'location' => 'Madrid, Spain', 'category' => 'Marketing', 'type' => 'Full Time', 'is_featured' => true, 'description' => 'Revolut is hiring an Email Marketing Manager to design and optimise campaigns that engage millions of global customers.'],
            ['title' => 'Brand Strategist', 'company' => 'GoDaddy', 'company_logo' => 'https://logo.clearbit.com/godaddy.com', 'location' => 'Marseille, France', 'category' => 'Marketing', 'type' => 'Full Time', 'is_featured' => false, 'description' => 'GoDaddy is seeking a Brand Strategist to shape its global brand narrative and drive positioning across multiple markets.'],
            ['title' => 'Social Media Manager', 'company' => 'Netlify', 'company_logo' => 'https://logo.clearbit.com/netlify.com', 'location' => 'Paris, France', 'category' => 'Marketing', 'type' => 'Full Time', 'is_featured' => false, 'description' => 'Netlify is looking for a Social Media Manager to grow our developer brand across channels and drive technical community engagement.'],
            ['title' => 'Growth Marketer', 'company' => 'Pitch', 'company_logo' => 'https://logo.clearbit.com/pitch.com', 'location' => 'Berlin, Germany', 'category' => 'Marketing', 'type' => 'Full Time', 'is_featured' => false, 'description' => 'Pitch is hiring a Growth Marketer to accelerate adoption of our presentation platform and experiment with new acquisition channels.'],

            // ── Technology ─────────────────────────────────────────
            ['title' => 'Data Analyst', 'company' => 'Twitter', 'company_logo' => 'https://logo.clearbit.com/twitter.com', 'location' => 'San Diego, US', 'category' => 'Technology', 'type' => 'Full Time', 'is_featured' => true, 'description' => 'Twitter is looking for a Data Analyst to analyse large datasets and surface insights that improve product decisions.'],
            ['title' => 'Full Stack Developer', 'company' => 'Udacity', 'company_logo' => 'https://logo.clearbit.com/udacity.com', 'location' => 'Remote', 'category' => 'Technology', 'type' => 'Remote', 'is_featured' => false, 'description' => 'Udacity is seeking a Full Stack Developer to build and scale its e-learning platform serving hundreds of thousands of learners.'],
            ['title' => 'Backend Engineer', 'company' => 'Webflow', 'company_logo' => 'https://logo.clearbit.com/webflow.com', 'location' => 'Remote', 'category' => 'Technology', 'type' => 'Remote', 'is_featured' => false, 'description' => 'Webflow is hiring a Backend Engineer to power the infrastructure behind its no-code website builder platform.'],
            ['title' => 'Mobile Developer', 'company' => 'ClassPass', 'company_logo' => 'https://logo.clearbit.com/classpass.com', 'location' => 'Manchester, UK', 'category' => 'Technology', 'type' => 'Full Time', 'is_featured' => false, 'description' => 'ClassPass is looking for a Mobile Developer to build world-class iOS and Android experiences for fitness enthusiasts.'],

            // ── Engineering ─────────────────────────────────────────
            ['title' => 'Frontend Engineer', 'company' => 'Vercel', 'company_logo' => 'https://logo.clearbit.com/vercel.com', 'location' => 'Remote', 'category' => 'Engineering', 'type' => 'Remote', 'is_featured' => true, 'description' => 'Vercel is looking for a Frontend Engineer to build the tools that empower developers to ship faster at the edge.'],
            ['title' => 'DevOps Engineer', 'company' => 'Terraform', 'company_logo' => 'https://logo.clearbit.com/hashicorp.com', 'location' => 'Hamburg, Germany', 'category' => 'Engineering', 'type' => 'Full Time', 'is_featured' => false, 'description' => 'HashiCorp Terraform is hiring a DevOps Engineer to scale infrastructure automation used by teams worldwide.'],
            ['title' => 'Cloud Architect', 'company' => 'Cloudflare', 'company_logo' => 'https://logo.clearbit.com/cloudflare.com', 'location' => 'Austin, US', 'category' => 'Engineering', 'type' => 'Full Time', 'is_featured' => false, 'description' => 'Cloudflare is seeking a Cloud Architect to design resilient, globally distributed systems at hyperscale.'],
            ['title' => 'Site Reliability Engineer', 'company' => 'GitHub', 'company_logo' => 'https://logo.clearbit.com/github.com', 'location' => 'Remote', 'category' => 'Engineering', 'type' => 'Remote', 'is_featured' => false, 'description' => 'GitHub is hiring an SRE to ensure platform reliability and availability for over 100 million developers worldwide.'],

            // ── Finance ─────────────────────────────────────────────
            ['title' => 'Financial Analyst', 'company' => 'Stripe', 'company_logo' => 'https://logo.clearbit.com/stripe.com', 'location' => 'San Francisco, US', 'category' => 'Finance', 'type' => 'Full Time', 'is_featured' => true, 'description' => 'Stripe is looking for a Financial Analyst to model business performance and support strategic decisions as we scale globally.'],
            ['title' => 'Accounting Manager', 'company' => 'Shopify', 'company_logo' => 'https://logo.clearbit.com/shopify.com', 'location' => 'Ottawa, Canada', 'category' => 'Finance', 'type' => 'Full Time', 'is_featured' => false, 'description' => 'Shopify is hiring an Accounting Manager to lead financial reporting and ensure compliance across our global operations.'],
            ['title' => 'Risk Analyst', 'company' => 'PayPal', 'company_logo' => 'https://logo.clearbit.com/paypal.com', 'location' => 'Chicago, US', 'category' => 'Finance', 'type' => 'Full Time', 'is_featured' => false, 'description' => 'PayPal is seeking a Risk Analyst to identify and mitigate financial risk across our payment ecosystem.'],
            ['title' => 'Investment Associate', 'company' => 'Coinbase', 'company_logo' => 'https://logo.clearbit.com/coinbase.com', 'location' => 'New York, US', 'category' => 'Finance', 'type' => 'Full Time', 'is_featured' => false, 'description' => 'Coinbase is looking for an Investment Associate to evaluate opportunities and manage portfolio strategy in the crypto economy.'],

            // ── Sales ───────────────────────────────────────────────
            ['title' => 'Account Executive', 'company' => 'Salesforce', 'company_logo' => 'https://logo.clearbit.com/salesforce.com', 'location' => 'New York, US', 'category' => 'Sales', 'type' => 'Full Time', 'is_featured' => true, 'description' => 'Salesforce is looking for an Account Executive to drive new business growth and manage strategic customer relationships.'],
            ['title' => 'Sales Manager', 'company' => 'HubSpot', 'company_logo' => 'https://logo.clearbit.com/hubspot.com', 'location' => 'Boston, US', 'category' => 'Sales', 'type' => 'Full Time', 'is_featured' => false, 'description' => 'HubSpot is hiring a Sales Manager to coach and scale a team of quota-carrying sales representatives.'],
            ['title' => 'Business Dev Rep', 'company' => 'Notion', 'company_logo' => 'https://logo.clearbit.com/notion.so', 'location' => 'San Francisco, US', 'category' => 'Sales', 'type' => 'Full Time', 'is_featured' => false, 'description' => 'Notion is seeking a Business Development Rep to identify and qualify new pipeline opportunities across enterprise accounts.'],
            ['title' => 'Enterprise Sales Exec.', 'company' => 'Zoom', 'company_logo' => 'https://logo.clearbit.com/zoom.us', 'location' => 'San Jose, US', 'category' => 'Sales', 'type' => 'Full Time', 'is_featured' => false, 'description' => 'Zoom is hiring an Enterprise Sales Executive to expand revenue with large organisations globally.'],

            // ── Business ────────────────────────────────────────────
            ['title' => 'Product Manager', 'company' => 'Atlassian', 'company_logo' => 'https://logo.clearbit.com/atlassian.com', 'location' => 'Sydney, Australia', 'category' => 'Business', 'type' => 'Full Time', 'is_featured' => true, 'description' => 'Atlassian is seeking a Product Manager to drive vision and roadmap for collaboration tools used by millions of teams.'],
            ['title' => 'Business Analyst', 'company' => 'McKinsey', 'company_logo' => 'https://logo.clearbit.com/mckinsey.com', 'location' => 'London, UK', 'category' => 'Business', 'type' => 'Full Time', 'is_featured' => false, 'description' => 'McKinsey is hiring a Business Analyst to solve complex strategy challenges for leading global organisations.'],
            ['title' => 'Operations Manager', 'company' => 'Airbnb', 'company_logo' => 'https://logo.clearbit.com/airbnb.com', 'location' => 'San Francisco, US', 'category' => 'Business', 'type' => 'Full Time', 'is_featured' => false, 'description' => 'Airbnb is looking for an Operations Manager to streamline and scale key business operations across new markets.'],
            ['title' => 'Strategy Lead', 'company' => 'Spotify', 'company_logo' => 'https://logo.clearbit.com/spotify.com', 'location' => 'Stockholm, Sweden', 'category' => 'Business', 'type' => 'Full Time', 'is_featured' => false, 'description' => 'Spotify is seeking a Strategy Lead to define and execute long-term growth initiatives across its audio platform.'],

            // ── Human Resource ──────────────────────────────────────
            ['title' => 'HR Manager', 'company' => 'Packer', 'company_logo' => 'https://logo.clearbit.com/hashicorp.com', 'location' => 'Lucerne, Switzerland', 'category' => 'Human Resource', 'type' => 'Full Time', 'is_featured' => true, 'description' => 'Packer is looking for an HR Manager to lead talent acquisition, employee engagement, and culture initiatives.'],
            ['title' => 'People Operations Lead', 'company' => 'Linear', 'company_logo' => 'https://logo.clearbit.com/linear.app', 'location' => 'Remote', 'category' => 'Human Resource', 'type' => 'Remote', 'is_featured' => false, 'description' => 'Linear is hiring a People Operations Lead to build world-class employee experiences across a distributed team.'],
            ['title' => 'Recruiter', 'company' => 'Intercom', 'company_logo' => 'https://logo.clearbit.com/intercom.com', 'location' => 'Dublin, Ireland', 'category' => 'Human Resource', 'type' => 'Full Time', 'is_featured' => false, 'description' => 'Intercom is seeking a Recruiter to source and attract exceptional talent across Engineering, Design, and Product.'],
            ['title' => 'Culture & Engagement Mgr', 'company' => 'Buffer', 'company_logo' => 'https://logo.clearbit.com/buffer.com', 'location' => 'Remote', 'category' => 'Human Resource', 'type' => 'Remote', 'is_featured' => false, 'description' => 'Buffer is hiring a Culture & Engagement Manager to maintain and evolve our fully-remote team culture.'],
        ];

        foreach ($jobs as $job) {
            JobListing::create($job);
        }
    }
}
