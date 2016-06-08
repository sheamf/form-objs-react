class EditCompanyForm < CompanyForm

  attr_reader :company, :employee_count

  def initialize(company)
    @company = company
    @name = company.name
    @employee_count = company.employee_count
    set_office_rows # kinda hack-y way to include office_rows in json rendered by CompaniesController#company_form
  end

  def set_office_rows
    office_rows
  end

  def office_rows
    @office_rows ||= company.offices.map { |office| EditOfficeRow.new(office) }
  end

  def persisted?
    true
  end

  def persist!
    @office_rows.each { |office_row| office_row.persist! }
    @company.update_attributes!(name: name, employee_count: employee_count)
  end

  def extract_params(params)
    super

    new_office_params = @office_params.select { |k, v| v[:id].blank? }

    @office_rows = office_rows.select { |row| row.persisted? } # remove NewOfficeRow instances

    @office_rows.each do |office_row|
      params = @office_params.select { |k, v| v[:id] == office_row.office.id.to_s }
      params = params.values.inject(:reduce)
      office_row.extract_params(params)
    end

    new_office_params.each do |k, v|
      params = v.merge(company: company)
      @office_rows << NewOfficeRow.new(params)
    end
  end

  class EditOfficeRow < OfficeRow

    attr_reader :company, :office, :id

    def initialize(office)
      @id = office.id
      @name = office.name
      @city = office.city
      @state = office.state
      @employee_count = office.employee_count
    end

    def persisted?
      true
    end

    def submit(params) # added for ajax editing of individual office
      extract_params(params)
      if valid?
        persist!
        true
      else
        false
      end
    end

    def valid? # added for ajax editing of individual office
      super
    end

    def extract_params(params)
      @remove = params[:remove]
      @name = params[:name]
      @city = params[:city]
      @state = params[:state]
      @employee_count = params[:employee_count]
    end

    def persist!
      @office = Office.find(id) # so as not to send an @office ivar to form, creating two 'office' keys in params
      if flagged_for_deletion?
        @office.destroy
      else
        @office.update_attributes!(name: name, city: city, state: state, employee_count: employee_count)
      end
    end

    private

      def flagged_for_deletion?
        @remove == 'true'
      end
  end
end